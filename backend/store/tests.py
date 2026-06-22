from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from store.models import Category, Product, Cart, CartItem

class CartTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.category = Category.objects.create(name='Test Category', slug='test-category')
        self.product = Product.objects.create(
            category=self.category,
            name='Test Product',
            description='Test Description',
            price=100.00
        )
        self.client.force_authenticate(user=self.user)

    def test_add_to_cart(self):
        # Verify cart starts empty
        response = self.client.get('/api/cart/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('items', [])), 0)

        # Add product to cart
        response = self.client.post('/api/cart/add/', {'product_id': self.product.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Product added to cart')

        # Verify product is in user's cart
        response = self.client.get('/api/cart/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('items', [])), 1)
        self.assertEqual(response.data['items'][0]['product'], self.product.id)
        self.assertEqual(response.data['items'][0]['quantity'], 1)
