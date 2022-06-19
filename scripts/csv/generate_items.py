import generators


items_spec = {
    'ID': generators.UUID(),
    'name': generators.ProductName(50),
    'price_value': generators.Decimal(10, 10),
    'price_currency': generators.CurrencyCode(),
    'description': generators.Description(3, 100),
    'ingredients': generators.Description(3, 50),
    'warnings': generators.Description(3, 50),
    'manufacturer': generators.CompanyName(200),
    'soldCount': generators.IntegerGenerator(0, 1000),
}
print(generators.generate_csv(items_spec))