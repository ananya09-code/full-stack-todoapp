from flask import Flask,Request,jsonify,render_template,request,url_for,redirect
from flask_sqlalchemy import SQLAlchemy   

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app)

class tasklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(80), nullable=False)
    note = db.Column(db.String(120),nullable=False)
    status = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f'<User {self.task}>', f'<User {self.note}>'  
    
with app.app_context(): 
    db.create_all()   
@app.route('/add', methods=["GET", "POST"])
def home():
    if request.method == 'POST':
        title = request.form.get('tit')
        note = request.form.get('dis')
        new_task = tasklist(title=title, note=note, status=True)
        db.session.add(new_task)
        db.session.commit()
    return render_template('index.html')   
@app.route("/api/viwe")
def seetask():
    task = tasklist.query.all()
    return jsonify([{'id': t.id,"name":t.title,'note':t.note,'status': t.status} for t in task])
@app.route("/api/remove/<int:id>",methods=["GET","POST"])
def remove(id):
    task=tasklist.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': f'Record {id} deleted'})

if __name__ == '__main__':
    app.run(debug=True)  


