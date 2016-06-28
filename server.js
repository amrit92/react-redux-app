
import Express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from './app/routes/index';
import { Provider }              from 'react-redux';
import {configureStore} from './app/redux/store/configureStore';
import promiseMiddleware         from './bin/PromiseMiddleware';
import fetchComponentData        from './app/utils/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';
import bodyParser from 'body-parser';

const app = Express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.config.js').default(app);
}

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, 'public')));

app.use( (req, res) => {
  const location = createLocation(req.url);
  const store    = configureStore();

  match({ routes, location: req.url  }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>

          <script>
          </script>
        </head>
        <body>
          <div id="root">${componentHTML}</div>
          <script type="application/javascript" src="bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Server listening on: ' + PORT);
});

