from django.contrib import admin

# Register your models here.
from .models import Category, Product, UserProfile, Orders,OrderItem
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(UserProfile)
admin.site.register(OrderItem)
admin.site.register(Orders)
