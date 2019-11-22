import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import PolynomialFeatures




def load_dataset(a = 'craigslistVehicles.csv'):
     return pd.read_csv(a)
 

def clean_dataset(vehicles_df):
    vehicles_df = vehicles_df.drop(columns=['city_url', 'image_url', 'lat', 'long'])

    vehicles_df = vehicles_df.dropna()
    vehicles_df.drop_duplicates(subset='url')

    vehicles_df.isnull().sum(axis=1).quantile(.95)
    vehicles_df = vehicles_df[vehicles_df.isnull().sum(axis=1) < 9]

    vehicles_df = vehicles_df[vehicles_df.price != 0]

    plt.figure(figsize=(3,6))
    sns.boxplot(y='price', data=vehicles_df);

    vehicles_df = vehicles_df[vehicles_df.price < 100000]

    plt.figure(figsize=(15,9))
    ax = sns.countplot(x='year',data=vehicles_df);
    ax.set_xticklabels(ax.get_xticklabels(), rotation=90, ha="right",fontsize=10);

    vehicles_df = vehicles_df[vehicles_df.year > 1985]

    vehicles_df.odometer.quantile(.999)
    vehicles_df = vehicles_df[~(vehicles_df.odometer > 500000)]
    
    plt.figure(figsize=(3,6))
    sns.boxplot(y='odometer', data=vehicles_df);
    
    sns.set(style="ticks", color_codes=True)
    sns.pairplot(vehicles_df, hue="condition")

    
    return vehicles_df

def getoptions(df):
    answer = {}
    answer['manufacturer'] = sorted(list(df.manufacturer.unique()))
    answer['condition'] = sorted(list(df.condition.unique()))
    answer['cylinders'] = sorted(list(df.cylinders.unique()))
    answer['fuel'] = sorted(list(df.fuel.unique()))
    answer['transmission'] = sorted(list(df.transmission.unique()))
    answer['drive'] = sorted(list(df.drive.unique()))
    answer['type'] = sorted(list(df.type.unique()))
    return answer
 
def preprocess(vehicles_df):
    X = vehicles_df.iloc[:,3:]
    y = vehicles_df.iloc[:, [2]].values
    X = X.drop(['VIN', 'make', 'title_status', 'paint_color', 'size', 'desc'], axis = 1)
    X['cylinders'] = X['cylinders'].apply(lambda x: int(x.split(' ')[0]) if x != 'other' else 4)
#     print(X.head())
    X = X.values
    return X, y


def encoding(X, y):

    labelencoder_X_1 = LabelEncoder()
    X[:,1] = labelencoder_X_1.fit_transform(X[:,1])
    labelencoder_X_2 = LabelEncoder()
    X[:,2] = labelencoder_X_2.fit_transform(X[:,2])
    labelencoder_X_3 = LabelEncoder()
    X[:,4] = labelencoder_X_3.fit_transform(X[:,4])
    labelencoder_X_4 = LabelEncoder()
    X[:,6] = labelencoder_X_4.fit_transform(X[:,6])
    labelencoder_X_5 = LabelEncoder()
    X[:,7] = labelencoder_X_5.fit_transform(X[:,7])
    labelencoder_X_6 = LabelEncoder()
    X[:,8] = labelencoder_X_6.fit_transform(X[:,8])


    scaler_1 = StandardScaler()
    X[:,0:1] = scaler_1.fit_transform(X[:,0:1])
    scaler_2 = StandardScaler()
    X[:,5:6] = scaler_2.fit_transform(X[:,5:6])


    onehotencoder_1 = OneHotEncoder(categorical_features = [1])
    X = onehotencoder_1.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
    
    onehotencoder_2 = OneHotEncoder(categorical_features = [40])
    X = onehotencoder_2.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
        
    onehotencoder_3 = OneHotEncoder(categorical_features = [45])
    X = onehotencoder_3.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
        
    onehotencoder_4 = OneHotEncoder(categorical_features = [51])
    X = onehotencoder_4.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
        
    onehotencoder_5 = OneHotEncoder(categorical_features = [56])
    X = onehotencoder_5.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
        
    onehotencoder_6 = OneHotEncoder(categorical_features = [58])
    X = onehotencoder_6.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)
        
    onehotencoder_7 = OneHotEncoder(categorical_features = [-1])
    X = onehotencoder_7.fit_transform(X).toarray()
    X = np.delete(X, 0, 1)

    label = [labelencoder_X_1, labelencoder_X_2, labelencoder_X_3, labelencoder_X_4, labelencoder_X_5, labelencoder_X_6]
    scaler = [scaler_1, scaler_2]
    onehot = [onehotencoder_1, onehotencoder_2, onehotencoder_3, onehotencoder_4, onehotencoder_5, onehotencoder_6, onehotencoder_7]
        
    return X, y, label, scaler, onehot


def model_creation():
     regressor = LinearRegression()
     return regressor

def model_poly():
     poly_features = PolynomialFeatures(degree=2)
     return poly_features

def fit_poly(poly, x, y):
       x_poly = poly.fit_transform(x)
       poly_model = LinearRegression()
       poly_model.fit(x_poly, y)
       return poly_model



def fit_model(regressor, x, y):
     return regressor.fit(x, y)
     
def model_save_weights(regressor):
     filename= "regression.sav"
     pickle.dump(regressor, open(filename, 'wb'))

def load_model(filename):
     load_lr_model =pickle.load(open(filename, 'rb'))
     return load_lr_model






# def model_creation(shape):
#     print(shape)
#     NN_model = Sequential()
    
#     NN_model.add(Dense(128, kernel_initializer='normal',input_dim = shape, activation='relu'))
#     NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
#     NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
#     NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
#     NN_model.add(Dense(1, kernel_initializer='normal',activation='linear'))

#     NN_model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['mean_absolute_error'])
#     NN_model.summary()
    
#     return NN_model

# def create_checkpoint():
#     checkpoint_name = 'Weights-{epoch:03d}--{val_loss:.5f}.hdf5' 
#     checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss', verbose = 1, save_best_only = True, mode ='auto')
#     callbacks_list = [checkpoint]
#     return callbacks_list

# def fitModel(model, x_train, y_train, callbacks, epochs = 700, batch_size = 32, validation_split = 0.2):
#     model.fit(x_train, y_train, epochs = epochs, batch_size=batch_size, validation_split = validation_split, callbacks = callbacks)
#     return model

# def loadWeight( name = 'Weights-1357--2238.69423.hdf5'):
#     wights_file = name # choose the best checkpoint 
#     model.load_weights(wights_file) # load it
#     model.compile(loss='mean_absolute_error', optimizer='adam', metrics=['mean_absolute_error'])
#     return model
    

 
# vehicles_df = load_dataset()
# vehicles_df.info()
# vehicles_df.head()
# vehicles_df = clean_dataset(vehicles_df)
# X, y = preprocess(vehicles_df)
# X, y, label, scaler, onehot = encoding(X, y)
# x_train, x_test, y_train, y_test = train_test_split(X,y, test_size =0.2, random_state = 0)
# regressor = model_creation()
# regressor = load_model('regression.sav')
# model_save_weights(regressor)
# y_ans = regressor.predict(x_test)
# print(y_ans)
# print(r2_score(y_test, y_ans))

# poly_features = model_poly()
# poly_regressor = fit_poly(poly_features, x_train, y_train)
# y_poly = poly_regressor.predict(poly_features.fit_transform(x_test))
# print(r2_score(y_test, y_poly))
# print(y_poly)
# model = model_creation()
# callbacks = create_checkpoint()  
# #fitModel(x_train, y_train, callbacks = callbacks)  
# loadWeight()
# predictions = model.predict(x_test)
# print(r2_score(y_test, predictions)) 



