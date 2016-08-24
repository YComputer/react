
var rawHTML = {
    __html: "<h1>I am inner HTML</h1>"
}


var HelloWorld = React.createClass({
    render: function(){
        console.log(this);
        return (
            <div><h2>Hello {(function(obj){
                console.log(obj);                
                if(obj.props.name)
                    return obj.props.name
                else
                    return "World"
            })(this)}</h2></div>
        )
    }
});


ReactDOM.render(<div name="hahah" dangerouslySetInnerHTML={rawHTML}/>, document.getElementById('helloworld'));