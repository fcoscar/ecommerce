from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('users/profile/', views.getUserProfile),
    path('users/profile/update/', views.udpateUser),
    path('users/create/', views.createUser),
    path('products/', views.getProducts),
    path('products/<str:pk>/', views.getProduct),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]