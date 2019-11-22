from flask import Flask, request, jsonify
from flask_cors import CORS
from model import *
import pandas as pd



app = Flask(__name__)

CORS(app)  # allow cross origin

vehicles_df = load_dataset()
vehicles_df = clean_dataset(vehicles_df)
X, y = preprocess(vehicles_df)
X, y, label, scaler, onehot = encoding(X,y)
x_train, x_test, y_train, y_test = train_test_split(X,y, test_size =0.2, random_state = 0)




# loadWeight(  )
# model = model_creation()
# callbacks = create_checkpoint()  
# fitModel(model, x_train, y_train, callbacks = callbacks)  
# loadWeight()
# predictions = model.predict(x_test)
# print(r2_score(y_test, predictions)) 

def predictions(content):
    value = pd.DataFrame(columns=['year','manufacturer','condition','cylinders','fuel','odometer','transmission','drive','type'])
    value.loc[0] = [content['date'], content['manufacture'], content['cond'], int(content['cyl'].split(' ')[0]), content['fl'], float(content['dist']), content['transs'], content['driveType'], content['carType']]
    value = value.values
    value[:,1] = label[0].transform(value[:,1])
    value[:,2] = label[1].transform(value[:,2])
    value[:,4] = label[2].transform(value[:,4])
    value[:,6] = label[3].transform(value[:,6])
    value[:,7] = label[4].transform(value[:,7])
    value[:,8] = label[5].transform(value[:,8])

    value[:, 0:1] = scaler[0].transform(value[:, 0:1])
    value[:, 5:6] = scaler[1].transform(value[:, 5:6])

    value = onehot[0].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[1].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[2].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[3].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[4].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[5].transform(value).toarray()
    value = np.delete(value, 0, 1)

    value = onehot[6].transform(value).toarray()
    value = np.delete(value, 0, 1)

    model = model_creation()
    model = load_model('regression.sav')

    answer = model.predict(value)
    print(answer)

    return answer[0][0]

@app.route("/getprice", methods=["GET", "POST"])
def catch_all():
    content = request.json
    test = predictions(content)
    
    return jsonify({'ans': test})

@app.route("/options",  methods=["GET"])
def options():
    answer = getoptions(vehicles_df)
    return jsonify(answer)





    