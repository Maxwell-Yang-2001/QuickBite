# NoSQL

Due to the technical limitations of setting up SQL, we decide to take the NoSQL approach by utilizing DynamoDB table on AWS, which has a trivial entry.

## Tables

### Customers:
 - id: `string`
 - email: `string`
 - address: `string`
 - payment_method: `TODO`
 - phone_number: `string`
 - order_ids: `List[string]`

#### Example:
 - id: Thomas
 - email: xxxxx@gmail.com
 - address: Unit 123 23th street, Vancouver, BC
 - payment_method: `TODO`
 - phone_number: 236863xxxx
 - order_ids: [123321, 1234321, 5321321, ...]

 ### Orders
 - id: `string`
 - customer_id: `string`
 - restaurant_id: `string`
 - content: `List[object]`
 - extra_charge: `string`
 - time: `time`
 - driver_id: `string`
 - status: `string`

 #### Example:
 - id: 1234567
 - customer_id: 3213534
 - restaurant_id: wd234eqedre32
 - content: [{dish_name: fried_chicken, unit_price: $5, amount: 3, dish_picture: xxx.png}]
 - extra_charge: $5
 - time: Jan 1st, 2023
 - driver_id: 21e32edqw
 - status: delivered

 ### Restaurant
 - restaurant_id: `string`
 - restaurant_name: `string`
 - restaurant_description: `string`
 - restaurant_address: `string`
 - restaurant_phone_number: `string`
 - schedule: `TODO`
 - bank_account: `string`
 - menu: `List[object]`
 - restaurant_image: `picture`

 #### Example:
 - restaurant_id: 32d31s1
 - restaurant_name: Quickbite
 - restaurant_description: Chinese style
 - restaurant_address: 1234 West 21th street
 - restaurant_phone_number: 21312434
 - schedule: 11:00am - 8:00pm, everyday
 - bank_account: 1234qwer321
 - Menu: [{dish_name: Fried rice, unite_price: $10, dish_description: ingredients, dish_picture: xxx.png}]
 - restaurant_image: xyz.png

 ### Driver
 - driver_id: `string`
 - driver_name: `string`
 - license_number:`string`
 - car_brand: `string`
 - car_model: `string`
 - level: `string`
 - driver_image: `picture`

 #### Example:
  - driver_id: 89ewhf80h
 - driver_name: Maxwell
 - license_number: 8ff8fj9d9h7g
 - car_brand: Tesla
 - car_model: Model S
 - level: Gold
 - driver_image: qwe.png


