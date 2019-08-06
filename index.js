class EXPR
{
    calc = "";
    num = [];
    stack = [];
    importance = {
        '+' : 1,
        '-' : 1,
        '*' : 2,
        '/' : 2,
        '%' : 2
    }

    isOperator(str){
        if(str === '+' || str === '-' || str === '*' || str === '/' || str === '%')
            return true;
        return false;
        
    }

    isInt(str) {
        if (Number.isInteger(parseInt(str)))
          return true;
        return false;
      }

    eval_expr (){
        let  i = 0;
        while(this.num.length >= 1 && i < 100)
        {
            if( this.isInt(this.num[i]) && this.isInt(this.num[i + 1]) && this.isOperator(this.num[i + 2 ])){
                let first = this.num.splice(i , 1 , 0) ;
                let second = this.num.splice(i + 1  , 1) ;
                let operator = this.num.splice(i + 1  , 1) ;
                let result = 0;
                if(operator == '+'){
                    result = parseInt(parseInt(first) + parseInt(second));
                } else if (operator == '-')
                {
                    result = parseInt(parseInt(first) - parseInt(second));

                } else if (operator == '*')
                {
                    result = parseInt(parseInt(first) * parseInt(second));

                } else if (operator == '/')
                {
                    result = parseInt(parseInt(first) / parseInt(second));

                } else if(operator == '%')
                {
                    result = parseInt(parseInt(first) % parseInt(second));

                }
                this.num.splice(i , 1, result)
                
                i = -1;

            }
            i++;
        }
    }
    init (string){
        this.calc = string;
        for( let i = 0 ; i < this.calc.length ; i++)
        {
            if(this.isInt(this.calc[i])){
                let number = this.calc[i];
                while(this.isInt(this.calc[i + 1])){
                    number += this.calc[i + 1];
                    i++;
                }
                this.num.push(parseInt(number))
            } 
            else if (this.isOperator(this.calc[i])){
                        while(this.importance[this.calc[i]] <= this.importance[this.stack[this.stack.length - 1]] && this.stack[this.stack.length - 1] != '(')
                        {
                            this.num.push(this.stack.pop())
                        }
                        this.stack.push(this.calc[i])
            } else if(this.calc[i] == '(')
            {
                this.stack.push(this.calc[i])

            } else if(this.calc[i] == ')')
            {
                
                while(this.stack[this.stack.length - 1] != '('){
                    this.num.push(this.stack.pop())
                    
                }
                this.stack.pop()
            }
            
        }
        for( let i = this.stack.length - 1 ; i >= 0 ; i--)
        {
            this.num.push(this.stack[i])
        }  
        
    }

}

function eval_expr(str)
{
    const oui = new EXPR();
    oui.init(str);
    oui.eval_expr()
    console.log(oui.num[0])
}
 
eval_expr(process.argv[2]);
