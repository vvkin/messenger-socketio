from app.auth import auth


@auth.route('/register/', methods=['POST'])
def register():
    pass


@auth.route('/login/', methods=['POST'])
def login():
    pass
