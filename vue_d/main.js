/**
 * Created by Administrator on 2017/6/26.
 */


var app =  new Vue({
   el:'#app',
    data:{
        msg:'this is new Time: '+ new Date(),
        input:'',
        bgcolor:'bg_red'

    }
});

var app2 = new Vue({
   el:'#app2' ,
    data:{
        themeg2:'why are you so beautiful . ',
        show:true
    }
});

var app3 = new Vue({
  el:'#app3',
    data:{
        msg3:true,
        show:false
    }
});

var app4 = new Vue({
   el:'#app4',
    data:{
        todos:[
            {text:'好好 学习'},
            {text:'天天向上'},
            {text:'wow!'}
            ],
            price:'28',
            msg:'lie sdkjfasdgeDjiojdfgk',
            show_app4:true,
    }, 
    filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    reverse:function(string){ 
 		if (!string) return ''
 			string=string.toString()
 		return string.split('').reverse().join('')
    }
  },
  computed:{ 
  	title:function(){ 
  		return this.msg+'this is a new life!!'
  	}

  }

});


Vue.filter('currency',function(string){ 

});

Vue.filter('reverse', function (value) {
 return value.split('').reverse().join('')
})