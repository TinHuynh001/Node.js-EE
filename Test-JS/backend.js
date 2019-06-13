class listNode
{
    constructor(data, nextNode)
    {
        this.data = data;
        this.nextNode = nextNode;
    }
    
    getData()
    {
        return this.data;
    }
    
    setData(d)
    {
        this.data = d;
    }
    
    getNext()
    {
        return this.nextNode;
    }
    
    setNext(n)
    {
        this.nextNode =n;
    }
}




var LinkedList = {
    head: null,
    tail: null,
    size: 0,

    //helper unftion when the list is empty
    init: function(nNode)
    {
        this.head = nNode;
        this.tail = nNode;
    },
    
    //add an element to the end of the list
    addLast: function(nNode)
    {
        if (!(nNode instanceof listNode))
        {
            throw "Invalid input type. Must be a listNode";
        }
        
        if(this.isEmpty())
        {
            this.init(nNode);
        }
        else
        {
            this.tail.setNext(nNode);
            this.tail = nNode;
        }
        
        this.size++;
        
    },
    
    //add an element to the head of the list
    addFirst: function(nNode)
    {
        if (!(nNode instanceof listNode))
        {
            throw "Invalid input type. Must be a listNode";
        }
        
        if(this.isEmpty())
        {
            this.init(nNode);
        }
        else
        {
            nNode.setNext(this.head);
            this.head = nNode;
        }
        
        this.size++;
    },
    
    //remove the first element of the list
    //return it
    removeFirst: function()
    {
        var t;
        if(this.isEmpty())
        {
            throw "List is already empty.";
        }
        else
        {
            t = this.head;
            this.head = this.head.getNext();           
        }
        
        this.size--;
        return t;
    },
    
    //remvoe the last element of the list
    //return it
    removeLast: function()
    {
        var l;
        if(this.isEmpty())
        {
            throw "List is already empty.";
        }
        else
        {
            //get the element right next to last
            this.last = this.elementAt(this.size -1);
            
            //set it as the last node, 
            l = this.last.getNext();
            //then cut the link by setting its next to null
            this.last.setNext(null);
       
        }
        
        this.size--;
        return l;
    },
    
    //index starts at 0
    elementAt: function(where)
    {
        var current = this.head;
        
        for(var i = 0; i < where; i++)
        {
            current = current.getNext();
        }
        
        return current;
    },

    setElementAt: function(where, what)
    {
      var here = this.elementAt(where);
      here.setData(what);
    },

    toArray: function()
    {
      var ret = [];
      var current = this.head;

      for(var i = 0; i < this.size; i++)
        {
          ret.push(current.getData());
          current = current.getNext();
        }


      return ret;
    },
    
    //empty check as helper
    isEmpty: function()
    {
        if(this.size === 0)
        {
            return true;
        }
    },
    
    getSize: function()
    {
        return this.size;
    },
    
    getHead: function()
    {
        return this.head;
    }
}


var test1 = new listNode("3", 15);
var test2 = new listNode("4", 15);
var test3 = new listNode("5", null);
var test4 = new listNode("6", 15);
var test5 = new listNode("7", null);

//console.log(typeof test1);
//console.log(test1 instanceof listNode);

//console.log(test1.getData());
//console.log(test2.getData());
//console.log(LinkedList.isEmpty());
LinkedList.addLast(test1);
LinkedList.addFirst(test3);
LinkedList.addLast(test2);
LinkedList.addLast(test5);
LinkedList.addLast(test4);


console.log("The list size is " + LinkedList.size);
var current = LinkedList.getHead();
for(var i = 0; i < LinkedList.getSize(); i++)
{
    console.log("Data at index " + i + " is " + current.getData());
    current = current.getNext();
}

LinkedList.removeLast();
LinkedList.removeFirst();
LinkedList.setElementAt(2, 5);

console.log("The list size is " + LinkedList.size);
current = LinkedList.getHead();
for(var i = 0; i < LinkedList.getSize(); i++)
{
    console.log("Data at index " + i + " is " + current.getData());
    current = current.getNext();
}


//2nd question

const express = require('express');
const app = express();
const port = process.env.PORT;

//request to get a specific element
app.get('/api/list/:index',(req, res)=> {
  let b = LinkedList.elementAt(req.params.index).getData();
  res.send(b);
  return;
});

//request to get the entire linked list
//user likely won't need to know/operate the list
//so just convert the list into an array and send back.
app.get('/api/list', (req,res) => {
  let a = LinkedList.toArray();
  res.send(a);
  return;
})


//request to edit a specific node
//JSON body must have:
// "data"
app.put('/api/list/:at', (req,res) => {
  //type checking
  if(req.body.data == null)
  {
    return; //node data can be null though.
  }
  else if (req.params.index < 0 || req.params.index > LinkedList.size-1)
  {
    return;
  }
  else //edit starts here
  {
    let element = LinkedList.elementAt(req.params.index);
    element.setData(req.body.data);
    return;
  }

})

//Add an element to the front or the back of the list
//JSON body must have:
// "data" - that will be stored in the new node
// "addTo" - integer, to indicate the location of the add. 1 for front, -1 for tail
app.post('/api/list', (req,res) => {
  if (req.body.addTo == 1)
  {
    let e = new listNode(req.body.data, null);
    LinkedList.addFirst(e);
    res.status(200).send();
  }
  else if (req.body.addTo == -1)
  {
    let e = new listNode(req.body.data, null);
    LinkedList.addLast(e);
    res.status(200).send();
  }
  else
  {
    return;
  }
})

//Delete an element at the front or the back of the list
//JSON body must have:
// "data" - that will be stored in the new node
// "addTo" - integer, to indicate the location of the add. 1 for front, -1 for tail
app.delete('/api/list', (req,res) => {
  if (req.body.addTo == 1)
  {
    let e = LinkedList.removeFirst(e);
    res.status(200).send();
    return e.getData();
  }
  else if (req.body.addTo == -1)
  {
    let e = LinkedList.removeLast(e);
    res.status(200).send();
    return e.getData();
  }
  else
  {
    return;
  }
})


//start the listener
app.listen(port);