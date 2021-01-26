import { identity, pipe, prop, sortBy } from 'ramda';
import httpFactory from 'services/http.factory';
import { updatePropMsg } from 'services/Update';
import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

function app(initModel, update, view, node) {
  let http = httpFactory();
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  feather.replace();

  http
    .get('/books')
    .then(res => sortBy(prop('title'), res.data))
    .then(pipe(updatePropMsg('books'), dispatch))
    .catch(pipe(prop('message'), updatePropMsg('apiError'), dispatch));

  function dispatch(msg) {
    let request = null;
    [model, request] = update(msg, model);
    request
      ? request()
          .then(identity)
          .catch(pipe(prop('message'), updatePropMsg('apiError'), dispatch))
      : null;
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
    feather.replace();
  }
}

export default app;
