# Reset state before starting tests

- [ ] POST 200 /reset

OK

# Get balance for non-existing account

- [ ] GET 404 /balance?account_id=1234

0

# Create account with initial balance

- [ ] POST 201 /event {"type":"deposit", "destination":"100", "amount":10}

{"destination": {"id":"100", "balance":10}}

# Deposit into existing account

- [ ] POST 201 /event {"type":"deposit", "destination":"100", "amount":10}

{"destination": {"id":"100", "balance":20}}

# Get balance for existing account

- [ ] GET 200 /balance?account_id=100

20

# Withdraw from non-existing account

- [ ] POST 404 /event {"type":"withdraw", "origin":"200", "amount":10}

0

# Withdraw from existing account

- [ ] POST 201 /event {"type":"withdraw", "origin":"100", "amount":5}

{"origin": {"id":"100", "balance":15}}

# Transfer from existing account

- [ ] POST 201 /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}

{"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}}

# Transfer from non-existing account

- [ ] POST 404 /event {"type":"transfer", "origin":"200", "amount":15, "destination":"300"}

0
