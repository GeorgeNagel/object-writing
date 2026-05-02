from django.test import TestCase

from .models import CustomUser


class CustomUserModelTest(TestCase):
    def test_create_and_retrieve_user(self):
        CustomUser.objects.create_user(username="testuser", password="password123")
        user = CustomUser.objects.get(username="testuser")
        self.assertEqual(user.username, "testuser")
