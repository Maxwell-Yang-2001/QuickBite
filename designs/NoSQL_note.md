# NoSQL

Due to the technical limitations of setting up SQL, we decide to take the NoSQL approach by utilizing DynamoDB table on AWS, which has a more convenient setup.

## Tables

### Customers:
 - id: `string`
 - first_name: `string`
 - last_name: `string`
 - email: `string`
 - address: `string`
 - payment_method: `TODO`
 - phone_number: `string`
 - order_ids: `List[string]`

#### Example:
```json
{
  "id": "4y589dhkj",
  "first_name": "Thomas",
  "last_name": "Song",
  "email": "xxxxx@gmail.com",
  "address": "123-23 Rufus street, Vancouver, BC",
  "payment_method": "TODO",
  "phone_number": "236863xxxx",
  "order_ids": [
    "123321",
    "1234321",
    "5321321"
  ]
}
 ```

### Orders:
 - id: `string`
 - customer_id: `string`
 - store_id: `string`
 - content: `List[object]`
 - extra_charge: `number`
 - tip: `number`
 - currency: `string`
 - time: `time`
 - driver_id: `string`
 - status: `string`
 - store_rating: `number | undefined`
 - driver_rating: `number | undefined`

#### Example:
```json
{
  "id": "1234567",
  "customer_id": "3213524",
  "store_id": "dhe7yd9qohd9",
  "content": [
    {
      "name": "Fried Chicken",
      "unit_price": "5",
      "amount": 3,
      "image": "fried-chicken.png"
    },
    {
      "name": "Fried Rice",
      "unit_price": "10",
      "amount": 1,
      "image": "fried-rice.png"
    }
  ],
  "extra_charge": 1.25,
  "tip": 3.15,
  "currency": "CAD",
  "time": "June 13th, 2023 at 12:05 p.m.",
  "driver_id": "hwq9dh11",
  "status": "delivered",
  "store_rating": "undefined",
  "driver_rating": 5
}
 ```

### Stores:
 - id: `string`
 - name: `string`
 - description: `string`
 - address: `string`
 - phone_number: `string`
 - schedule: `List[object]`
 - bank_account: `TODO`
 - catalogue: `List[object]`
 - categories: `List[string]`
 - image: `string`
 - order_ids: `List[string]`
 - orders_count: `number`
 - ratings_count: `number`
 - rating: `number`

#### Example:
```json
{
  "id": "32d31s1",
  "name": "Quickbite",
  "description": "Chinese style",
  "address": "1234 West 21th street",
  "phone_number": "21312434",
  "schedule": [
    {
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "start": "12:00 p.m.",
      "end": "03:00 p.m."
    },
    {
      "days": ["Monday", "Wednesday", "Friday"],
      "start": "06:00 p.m.",
      "end": "10:00 p.m."
    },
    {
      "days": ["Tuesday", "Thursday"],
      "start": "06:00 p.m.",
      "end": "08:00 p.m."
    }],
  "bank_account": "1234qwer321",
  "catalogue": [
    {
      "name": "Fried Rice",
      "unit_price": "10",
      "description": "Chinese fried rice with eggs and sausage",
      "image": "fried-rice.png",
      "catagories": ["Meat","Chef's Recommendation"]
    },
    {
      "name": "Bao",
      "unite_price": "5",
      "description": "One Traditional Chinese Bao with ground beef and green onion",
      "picture": "bao.png",
      "categories": ["Dim Sum"]
    }
  ],
  "categories": [
    "Beverages",
    "Meat",
    "Chef's Recommendation",
    "Dim Sum"
  ],
  "image": "xyz.png",
  "order_ids": [
    "123321",
    "1234321",
    "5321321"
  ],
  "orders_count": 3,
  "ratings_count": 2,
  "rating": 4.7
}
```

### Drivers:
 - id: `string`
 - first_name: `string`
 - last_name: `string`
 - license_number:`string`
 - vin: `string`
 - brand: `string`
 - model: `string`
 - level: `string`
 - driver_image: `string`
 - car_image: `string`
 - order_ids: `List[string]`
 - orders_count: `number`
 - ratings_count: `number`
 - rating: `number`

#### Example:
```json
{
  "id": "89ewhf80h",
  "first_name": "Maxwell",
  "last_name": "Yang",
  "license_number": "8ff8fj9d9h7g",
  "vin": "78dh3",
  "brand": "Teslas",
  "model": "Model S",
  "level": "Gold",
  "driver_image": "driver.png",
  "car_image": "car.png",
  "order_ids": [
    "123321",
    "1234321",
    "5321321"
  ],
  "orders_count": 3,
  "ratings_count": 2,
  "rating": 4.7
}
```
