'use strict'

var cluster = require('cluster');

function startWorker(isFirst) {

  var new_worker_env = {};
  if( isFirst ) {
    new_worker_env.isFirst = true;
}

  var worker = cluster.fork(new_worker_env);
  console.log('CLUSTER: worker %d started', worker.id);
}

if( cluster.isMaster ) {
/*
  require('os').cpus().forEach(function(){
    startWorker();
  });
*/
  startWorker(true);
  startWorker(false);
  cluster.on('disconnect', function(worker) {
    console.log('CLUSTER: worker %d disconnected from the cluster', worker.id);
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('CLUSTER: worker %d died with exit code %d (%s)', worker.id, code, signal);
    startWorker();
  });
}
else {
  require('./app.js')();
}
