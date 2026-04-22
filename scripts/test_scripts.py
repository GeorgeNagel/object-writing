#!/usr/bin/env python3
"""Tests for ticket/sprint scripts."""

import importlib.util
import io
import json
import sys
import tempfile
import unittest
from datetime import date
from pathlib import Path
from unittest.mock import patch

SCRIPTS_DIR = Path(__file__).parent


def load_script(name):
    spec = importlib.util.spec_from_file_location(name, SCRIPTS_DIR / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


class WithTempSprint(unittest.TestCase):
    sprint_data = []

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.tickets_dir = Path(self.tmp.name) / "tickets"
        self.tickets_dir.mkdir()
        (self.tickets_dir / "archive").mkdir()
        self.sprint_file = self.tickets_dir / "current-sprint.json"
        self.sprint_file.write_text(json.dumps(self.sprint_data, indent=2) + "\n")
        self.backlog_file = self.tickets_dir / "backlog.json"
        self.backlog_file.write_text("[]\n")

    def tearDown(self):
        self.tmp.cleanup()

    def read_sprint(self):
        return json.loads(self.sprint_file.read_text())


class TestCloseTicket(WithTempSprint):
    sprint_data = [
        {"id": "001", "title": "Do thing", "status": "in_progress", "sprint": 1, "dependencies": []},
        {"id": "002", "title": "Other thing", "status": "done", "sprint": 1, "dependencies": []},
    ]

    def _run(self, ticket_id, stdin_text=""):
        mod = load_script("close-ticket")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch("sys.argv", ["close-ticket.py", ticket_id]), \
             patch("sys.stdin", io.StringIO(stdin_text)):
            mod.main()

    def _run_expect_exit(self, ticket_id, stdin_text=""):
        with self.assertRaises(SystemExit) as cm:
            self._run(ticket_id, stdin_text)
        return cm.exception.code

    def test_closes_ticket_without_reason(self):
        self._run("001", stdin_text="\n")
        t = next(t for t in self.read_sprint() if t["id"] == "001")
        self.assertEqual(t["status"], "closed")
        self.assertEqual(t["closed_at"], date.today().isoformat())
        self.assertNotIn("closed_reason", t)

    def test_closes_ticket_with_reason(self):
        self._run("001", stdin_text="no longer needed\n")
        t = next(t for t in self.read_sprint() if t["id"] == "001")
        self.assertEqual(t["status"], "closed")
        self.assertEqual(t["closed_reason"], "no longer needed")

    def test_error_on_already_done(self):
        code = self._run_expect_exit("002", stdin_text="\n")
        self.assertNotEqual(code, 0)

    def test_error_on_already_closed(self):
        self._run("001", stdin_text="\n")
        code = self._run_expect_exit("001", stdin_text="\n")
        self.assertNotEqual(code, 0)

    def test_error_on_missing_ticket(self):
        code = self._run_expect_exit("999", stdin_text="\n")
        self.assertNotEqual(code, 0)

    def test_error_on_missing_arg(self):
        mod = load_script("close-ticket")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch("sys.argv", ["close-ticket.py"]):
            with self.assertRaises(SystemExit) as cm:
                mod.main()
        self.assertNotEqual(cm.exception.code, 0)


class TestCompleteTicket(WithTempSprint):
    sprint_data = [
        {"id": "001", "title": "Do thing", "status": "in_progress", "sprint": 1, "dependencies": []},
        {"id": "002", "title": "Other", "status": "done", "sprint": 1, "dependencies": []},
    ]

    def _run(self, ticket_id):
        mod = load_script("complete-ticket")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch("sys.argv", ["complete-ticket.py", ticket_id]):
            mod.main()

    def test_sets_done(self):
        self._run("001")
        t = next(t for t in self.read_sprint() if t["id"] == "001")
        self.assertEqual(t["status"], "done")
        self.assertEqual(t["completed_at"], date.today().isoformat())

    def test_error_on_already_done(self):
        mod = load_script("complete-ticket")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch("sys.argv", ["complete-ticket.py", "002"]):
            with self.assertRaises(SystemExit) as cm:
                mod.main()
        self.assertNotEqual(cm.exception.code, 0)


class TestSprintClose(WithTempSprint):
    sprint_data = [
        {"id": "001", "title": "Done", "status": "done", "sprint": 1, "dependencies": []},
        {"id": "002", "title": "Closed", "status": "closed", "sprint": 1, "dependencies": []},
    ]

    def _run(self):
        mod = load_script("sprint-close")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch.object(mod, "TICKETS_DIR", self.tickets_dir), \
             patch.object(mod, "ARCHIVE_DIR", self.tickets_dir / "archive"), \
             patch("sys.argv", ["sprint-close.py"]):
            mod.main()

    def test_accepts_closed_as_terminal(self):
        self._run()
        self.assertEqual(json.loads(self.sprint_file.read_text()), [])

    def test_rejects_incomplete_ticket(self):
        data = self.read_sprint()
        data.append({"id": "003", "title": "Todo", "status": "todo", "sprint": 1, "dependencies": []})
        self.sprint_file.write_text(json.dumps(data, indent=2) + "\n")
        mod = load_script("sprint-close")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch.object(mod, "TICKETS_DIR", self.tickets_dir), \
             patch.object(mod, "ARCHIVE_DIR", self.tickets_dir / "archive"), \
             patch("sys.argv", ["sprint-close.py"]):
            with self.assertRaises(SystemExit) as cm:
                mod.main()
        self.assertNotEqual(cm.exception.code, 0)


class TestListEligibleTickets(WithTempSprint):
    sprint_data = [
        {"id": "001", "title": "Done dep", "status": "done", "sprint": 1, "dependencies": []},
        {"id": "002", "title": "Closed dep", "status": "closed", "sprint": 1, "dependencies": []},
        {"id": "003", "title": "Needs done dep", "status": "todo", "sprint": 1, "dependencies": ["001"]},
        {"id": "004", "title": "Needs closed dep", "status": "todo", "sprint": 1, "dependencies": ["002"]},
        {"id": "005", "title": "Needs incomplete dep", "status": "todo", "sprint": 1, "dependencies": ["003"]},
    ]

    def test_closed_counts_as_satisfied_dependency(self):
        mod = load_script("list-eligible-tickets")
        with patch.object(mod, "CURRENT", self.sprint_file), \
             patch.object(mod, "BACKLOG", self.backlog_file), \
             patch("sys.argv", ["list-eligible-tickets.py"]):
            buf = io.StringIO()
            with patch("sys.stdout", buf):
                mod.main()
        output = buf.getvalue()
        self.assertIn("[003]", output)
        self.assertIn("[004]", output)
        self.assertNotIn("[005]", output)


class TestNewStory(WithTempSprint):
    def setUp(self):
        super().setUp()
        self.counter_file = self.tickets_dir / "next-id.txt"
        self.counter_file.write_text("042\n")

    def _run(self, title, stdin_text=""):
        mod = load_script("new-story")
        with patch.object(mod, "BACKLOG", self.backlog_file), \
             patch.object(mod, "COUNTER_FILE", self.counter_file), \
             patch("sys.argv", ["new-story.py", title]), \
             patch("sys.stdin", io.StringIO(stdin_text)):
            mod.main()

    def test_appends_ticket_with_empty_fields(self):
        self._run("My new story", "\n\n")
        tickets = json.loads(self.backlog_file.read_text())
        self.assertEqual(len(tickets), 1)
        t = tickets[0]
        self.assertEqual(t["id"], "042")
        self.assertEqual(t["title"], "My new story")
        self.assertEqual(t["status"], "todo")
        self.assertEqual(t["story"], "")
        self.assertEqual(t["acceptance_criteria"], [])
        self.assertEqual(t["dependencies"], [])

    def test_appends_ticket_with_criteria_and_deps(self):
        self._run("Story", "Criterion one\nCriterion two\n\n001\n002\n\n")
        t = json.loads(self.backlog_file.read_text())[0]
        self.assertEqual(t["acceptance_criteria"], ["Criterion one", "Criterion two"])
        self.assertEqual(t["dependencies"], ["001", "002"])

    def test_increments_counter(self):
        self._run("Some story", "\n\n")
        self.assertEqual(self.counter_file.read_text().strip(), "043")

    def test_multiple_calls_use_unique_ids(self):
        self._run("Story one", "\n\n")
        self._run("Story two", "\n\n")
        ids = [t["id"] for t in json.loads(self.backlog_file.read_text())]
        self.assertEqual(ids, ["042", "043"])

    def test_error_on_missing_arg(self):
        mod = load_script("new-story")
        with patch.object(mod, "BACKLOG", self.backlog_file), \
             patch.object(mod, "COUNTER_FILE", self.counter_file), \
             patch("sys.argv", ["new-story.py"]):
            with self.assertRaises(SystemExit) as cm:
                mod.main()
        self.assertNotEqual(cm.exception.code, 0)


if __name__ == "__main__":
    unittest.main()
