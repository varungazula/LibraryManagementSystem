from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
import mysql.connector as mysql
import requests
import json
from datetime import datetime
# from config import mysql_host, mysql_user, mysql_password, mysql_database


app = Flask(__name__)
app.config['SECRET_KEY'] = '12345'
mydb = mysql.connect(host= "us-cdbr-east-03.cleardb.com", user= "b922d4a2de1e6a", password="3ae708bb", database= "heroku_e63d91263a358b9")

@app.route('/')
def helloWorld():
    return render_template("index.html", name="Varun")

@app.route('/books', methods=["POST", 'GET'])
def books():

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * from books")
    data = mycursor.fetchall()
    title = "Books"
    links = ['members','transactions', 'reports']
    return render_template("books.html",links=links,title=title,data=data)

@app.route('/books_insert', methods=['POST', 'GET'])
def books_insert():
    if request.method=='POST':
        mycursor = mydb.cursor(buffered=True)
        page_no = request.form.get("starting")
        results = requests.get("https://frappe.io/api/method/frappe-library?page={}".format(int(page_no)))
        if results.status_code != 200:
            print("Error")
        flash("Thanks For Waiting !!!")
        for book in results.json()["message"]:
            mycursor.execute('''Select * from books where isbn = %s''',(book['isbn'],))
            if mycursor.rowcount==1:
                print("exists")
            else:
                mycursor.execute('''insert into books values(%s, %s, %s, %s, %s, %s, DEFAULT)''',(book['isbn'],book['title'], book['authors'], book['publisher'], book['  num_pages'], book['average_rating']))
                mydb.commit()
    return ("done")

@app.route('/books_delete', methods=["POST", "GET"])
def books_delete():
    if request.method == 'POST':
        id = request.form.get('string')
        mycursor = mydb.cursor()
        mycursor.execute('''delete from books where isbn = %s''',(id,))
        mydb.commit()
    return "hey"

@app.route('/books_update', methods=["POST", "GET"])
def books_update():
    if request.method == "POST":
        isbn = request.form.get('isbn')
        stock = request.form.get("stock")
        mycursor = mydb.cursor()
        mycursor.execute('''Update books set stock = %s where isbn = %s''',(stock,isbn,))
        mydb.commit()
    return "done"




@app.route('/get_data', methods = ["POST", "GET"])
def get_data():
    if request.method == "POST":
        mycursor = mydb.cursor()
        mycursor.execute('''Select isbn,title from books where stock>0''')
        data1 = mycursor.fetchall()
        mycursor.execute('''Select id ,name from members''')
        data2 = mycursor.fetchall()
    return jsonify({'htmlresponse': render_template('response.html',data1=data1, data2=data2)})
 

@app.route('/transactionadd', methods = ["POST", "GET"])
def transactionadd():
    if request.method == "POST":
        transaction = request.form.get("transaction")
        mname = request.form.get("mname")
        bname = request.form["bname"]
        type1 = request.form.get("type1")
        date = request.form.get("date")
        bad_chars = ["(", ")","'"]
        for i in bad_chars :
            mname = mname.replace(i, '')
            bname = bname.replace(i, '')
        res1 = list(mname.split(','))
        res2 = list( bname.split(', '))
        mycursor = mydb.cursor(buffered=True)
        mycursor.execute('''select debt from members where id = %s''',(res1[0],))
        data1 = mycursor.fetchall()
        mycursor.execute('''Select * from transactions where trans_id = %s''',(transaction,))
        if mycursor.rowcount==1:
            flash("ID Already Exists. Please Use another ID.")
        else:
            if data1[0][0]<500:
                mycursor.execute('''insert into transactions values(%s, %s, %s, %s, %s)''',(transaction, res1[0], res2[0], type1, date))
                # data1 = mycursor.fetchall()
                mydb.commit()       
                mycursor.execute('''update members set debt=debt+100 where id = %s''',(res1[0],))
                mydb.commit() 
                mycursor.execute('''update books set stock=stock-1 where isbn = %s''',(res2[0],))
                mydb.commit()
            else:
                flash("User has Debt of 500 or more hence cannot rent books")

    return "hehe"


@app.route('/issue_return', methods=["POST", "GET"])
def issue_return():
    if request.method=="POST":
        id = request.form.get("data")
        now = datetime.today()
        mycursor = mydb.cursor()
        mycursor.execute('''Select mem_id,b_id from transactions where trans_id=(%s)''',(id,))
        data = mycursor.fetchall()
        mycursor.execute(''' update transactions set status=(%s), date=(%s) where trans_id=(%s)''',("Returned",now.date(),id,))
        mydb.commit()
        mycursor.execute('''update books set stock=stock+1 where isbn=(%s)''',(data[0][1],))
        mydb.commit()
        mycursor.execute('''update members set debt=debt-100, spent=spent+100 where id=(%s)''',(data[0][0],))
        mydb.commit()

    return "COOL"

@app.route('/transaction_delete', methods= ["POST", "GET"])
def transaction_delete():
    if request.method=="POST":
        id = request.form.get("string")
        mycursor = mydb.cursor()
        mycursor.execute('''Select mem_id,b_id, status from transactions where trans_id=(%s)''',(id,))
        data = mycursor.fetchall()
        if data[0][2]=="Rent":
            mycursor.execute('''update books set stock=stock+1 where isbn=(%s)''',(data[0][1],))
            mydb.commit()
            mycursor.execute('''update members set debt=debt-100 where id=(%s)''',(data[0][0],))
            mydb.commit()
            mycursor.execute('''delete from transactions where trans_id=(%s)''',(id,))
            mydb.commit()
        elif data[0][2]=="Returned":
            mycursor.execute('''delete from transactions where trans_id=(%s)''',(id,))
            mydb.commit()
    return "he"






@app.route('/members', methods=["POST", 'GET'])
def members():
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * from members")
    data = mycursor.fetchall()
    mycursor.close()
    title = "Members"
    links = ['transactions', 'books', 'reports']
    return render_template("members.html", title= title,links=links , data=data)


@app.route("/ajax_add", methods=["POST", 'GET'])
def ajax_add():
    if request.method == 'POST':

        mycursor = mydb.cursor(buffered=True)

        name = request.form.get('textname')
        email = request.form.get('textmail')
        pnum = request.form.get('pnum')
        id = request.form.get('id')
        mycursor.execute('''Select * from members where id = %s''',(id,))
        if mycursor.rowcount==1:
            flash("ID Already Exists. Please Use another ID.")
        else:
            mycursor1 = mydb.cursor()
            sql = "INSERT INTO members (id, name,email, pnum) VALUES (%s, %s, %s, %s)"
            val = (id, name, email, pnum)
            mycursor1.execute(sql, val)
            mydb.commit()
            mycursor1.close()
        return jsonify({'redirect': url_for("members")})

    return jsonify(msg)

@app.route('/ajax_delete', methods=['POST', 'GET'])
def ajax_delete():
    mycursor = mydb.cursor()
    if request.method == 'POST':
        id = request.form.get('string')
        mycursor.execute(''' Select mem_id From transactions t join members m where t.mem_id = m.id and t.mem_id=%s''',(id,))   
        data1 = mycursor.fetchall()
        if mycursor.rowcount>=1:
            flash("User has existing Transactions, please delete them and try again.")
        else:
            mycursor.execute(''' Delete From members where id = %s ''',(id,))   
            mydb.commit()
            mycursor.close()            
        
    return "haah"

@app.route('/ajax_update', methods=["POST", "GET"])
def ajax_update():
    if request.method == "POST":
        mycursor = mydb.cursor(buffered=True)   
        id1 = request.form.get("id1")
        name1 = request.form.get('textname1')
        email1 = request.form.get('textmail1')
        pnum1 = request.form.get('pnum1')
        mycursor.execute(''' Update members SET name=%s, email=%s, pnum=%s  where id = %s ''',(name1,email1,pnum1,id1))   
        mydb.commit()
        mycursor.close()
    return("hi")

@app.route('/transactions',methods=["POST", "GET"])
def transactions():
    mycursor = mydb.cursor()
    mycursor.execute('''select transactions.trans_id, members.name, books.title, transactions.status, transactions.date from ((transactions inner join members on transactions.mem_id= members.id) inner join books on transactions.b_id = books.isbn)''')
    data2 = mycursor.fetchall()
    title = "Transactions"
    links = [ 'books','members', 'reports']
    return render_template("transactions.html",title=title,links=links, data2 = data2)

@app.route('/reports')
def reports():
    mycursor = mydb.cursor()
    mycursor.execute('''select b.isbn,b.title, b.stock,count(b.isbn)  from books b join transactions t on b.isbn=t.b_id where t.status = "Rent" group by(b.isbn)''')
    data1 = mycursor.fetchall()
    print(data1)
    mycursor.execute('''select id, name, email, spent from members where spent>0 ''')
    data2 = mycursor.fetchall()
    title = "Reports"
    links = [ 'members', 'transactions', 'books']
    return render_template("reports.html",title=title ,links= links, data1=data1, data2=data2)

if __name__ == "__main__":
    app.run(debug=True)