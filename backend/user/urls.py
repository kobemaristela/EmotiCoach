from django.urls import path
from .views import Login, Register, Logout, EditAccount, DeleteAccount, show_database

urlpatterns = [
    path('login', Login.as_view(), name="login"),
    path('register', Register.as_view(), name="register"),
    path('logout', Logout.as_view(), name="logout"),
    path('delete', DeleteAccount.as_view(), name="delete"),
    path('edit', EditAccount.as_view(), name="edit"),
    path('showDb', show_database)
]