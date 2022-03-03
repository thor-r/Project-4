from django.urls import path

# Views
from .views import CommentListView, CommentDetailView # Generic view for returning all reviews and posting new reviews

urlpatterns = [
    path('', CommentListView.as_view()),
    path('<int:pk>/', CommentDetailView.as_view())
]