from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def main():
    return 'The server is running'
@app.route('/api', methods=['POST'])
def api():
    # TODO: authenticate()
    # data = request.json
    msg = request.form.get('msg')
    return 'Response from API'

if __name__=='__main__':
    app.run()
