const app=Vue.createApp({
    data(){
        return{
            result:'',
            input2:'',
            input:'',
            operator:'',
            steps:'',
            operations:['*','/','+','-','%']
        }
    },
    methods:{
        get_result:function(){
           axios.post('http://localhost:8080/calculate',
               {
               a:parseFloat(this.result),
               b:parseFloat(this.input2),
               operation:this.operator
               }).then((response)=>{
              const data=response.data;
              this.result=data;
           });
           return this.result;
        },
       Operation:function(op){
            if((this.result!=='')&&(this.input!='')&&(this.operator!='')&&(this.result!='E MATH ERROR')){
                this.input2=this.input;
                this.steps+=this.input;
                this.get_result();
                this.input2='';
                this.operator=op;
                this.steps+=this.operator;
                this.input='';
            }
            else if((this.result==''||this.result=='E MATH ERROR')){
                this.steps='';
                this.result='';
                this.operator=op;
                if(this.input==''){
                this.result='0';
                this.steps+='0';
                this.steps+=this.operator;
                this.input='';}
                else {this.result=this.input;
                    this.steps+=this.input;
                    this.steps+=this.operator;
                    this.input='';
                }
            }
            else if(this.input==''){
                this.operator=op;
                if(this.operations.includes(this.steps.charAt(this.steps.length-1))) {
                    this.steps=this.steps.slice(0,-1);
                    this.steps+=op;}
                else{
                    this.steps+=op;
                }

            }
        },
      addPoint:function(){
            if(this.input!==''){
            if(this.input.indexOf(".")==-1){
                this.input+='.';
            }}
      },
      equal:function () {
            if(this.result=='E MATH ERROR'){
                this.reset();
            }
        if((this.input!='')&&(this.result!='')&&(this.operator!='')){
            this.input2=this.input;
            if(!(this.operations.includes(this.steps.charAt(this.steps.length-1)))){
                this.steps+=this.operator;
            }
            this.steps+=this.input;
            this.get_result();
            this.input2='';
            this.input='';
            this.steps+=this.operator;
        }
        else if((this.result!='')&&(this.operator!='')&&(this.input2=='')){
            this.input2=this.steps.replace(/\./g,"s").split(/[%\*+-/]/)[this.steps.replace(/\./g,"s").split(/[%\*+-/]/).length-2];
            this.input2=this.input2.replace(/s/g,".");
            this.steps+=this.input2;
            this.steps+=this.operator;
            this.get_result();
            this.input2='';
        }
      },
        reset:function () {
            this.result='';
                this.input2='';
                this.input='';
                this.operator='';
                this.steps='';

        }
        ,negate:function () {
            let temp;
            if(this.input!=''){
            if (this.input.indexOf('-') == -1) {
                temp = this.input;
                this.input = '-';
                this.input += temp;
            }
            else {
                this.input=this.input.slice(1,this.input.length);
            }}
        },
       
        Oneoperand:function (op) {
            if(this.input!==''){
                axios.post('http://localhost:8080/single',
                    {
                        a:parseFloat(this.result),
                        b:parseFloat(this.input),
                        operation:op
                    }).then((response)=>{
                    const data=response.data;
                    if(data=='E MATH ERROR'){
                        this.result='E MATH ERROR';
                        this.input='';
                        this.steps='';
                    }
                    else {
                        this.input=data.toString();
                    }
                });
            if(this.result=='E MATH ERROR'){this.result=0;}
        }},
       }




});