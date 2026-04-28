import sys

text = " ".join(sys.argv[1:])
with open("pain_points.md", "a") as f:
    f.write(f"\n\n{text}")
