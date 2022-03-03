from django.urls import path

#View
from .views import MediaListView, MediaDetailView # Generic view for returning all reviews and posting new reviews

urlpatterns = [
    path('', MediaListView.as_view()),
    path('<int:pk>/', MediaDetailView.as_view())
]