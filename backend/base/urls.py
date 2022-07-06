from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    #USER ROUTES
    path('users/', views.getUsers),
    path('users/profile/', views.getUserProfile),
    path('users/profile/update/', views.udpateUser),
    path('users/profile/create/', views.createUser),
    path('user/orders/', views.getUserOrders),
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #ADMIN ROUTES
    path('admin/deleteUser/<str:pk>/', views.deleteUser),
    path('admin/orders/', views.getAllOrders),
    #PRODUCT ROUTES
    path('products/', views.getProducts),
    path('products/<str:pk>/', views.getProduct),
    #ORDER ROUTES
    path('orders/add/', views.addOrderItems),
    path('orders/<str:pk>/', views.getOrderById),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]