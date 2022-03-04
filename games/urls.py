from django.urls import path

# Views 
from .views import GameListView, GameDetailView

urlpatterns = [
    path('', GameListView.as_view()),
    path('<int:pk>/', GameDetailView.as_view())
]