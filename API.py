# import requests

# #Total Pages are 200
# for page_no in range(1,10):
#     results = requests.get("https://frappe.io/api/method/frappe-library?page={}".format(page_no))
#     if results.status_code != 200:
#         print("Error")

#     for bk in results.json()["message"]:
#         print(bk)    
from datetime import datetime
# today = datetime.today()
# datem = datetime(today.year, today.month,today.day)
# print(datem)
now = datetime.today()
print(now.date())

# create table transactions(trans_id varchar(255), mem_id int, b_id varchar(255), status varchar(255), date DATE, Primary key(trans_id), FOREIGN KEY(mem_id) REFERENCES members(id), FOREIGN KEY(b_id) REFERENCES books(isbn))