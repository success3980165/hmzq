 var data = {
   labels: ['射门', '带球', '抢断', '拦截', '传球'],
   datasets: [{
     data: ['0', '0', '0', '0', '0'],
     backgroundColor: 'rgba(147, 219, 63, 0.6)',
     label: false,
     hidden: false
   }]
 };

 var options = {
   maintainAspectRatio: true,
   spanGaps: false,
   elements: {
     line: {
       tension: 0.000001
     }
   },
   scale: {
     ticks: {
       display: false
     }
   },
   legend: {
     display: false
   },
   plugins: {
     filler: {
       propagate: false
     },
     samples_filler_analyser: {
       target: 'chart-analyser'
     }
   }
 };

 // Chart.defaults.global.legend.display = false;
 var chart = new Chart('myChart', {
   type: 'radar',
   data: data,
   options: options
 });


 function updateChart(labels, datas) {
   var nlabels = [];
   var max = 0;
   _.forEach(labels, function(item, index) {
     var val = datas[index];
     if (val > max) {
       max = val;
     }
     nlabels[index] = item + '[' + val + ']';
   })
   chart.data.labels = nlabels;
   chart.data.datasets[0].data = datas;
   //  if (max > 100) {
   //    max = max * 1.1;
   //    chart.options.scale.ticks.max = max;
   //  } else {
   //    delete chart.options.scale.ticks.max;
   //  }

   chart.update();
 }
