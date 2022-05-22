# HTML Basic parser

The idea of this little project is to simply create a **lexer** and an HTML **parser** and eventually lead to the creation of a template engine able to make transformations on the fly.

This allows me to learn, gradually, how the tools around me work.

### Lexer
For now, the operation of the Lexer is rather simple: it simply splits the input string into tokens :

- `OpenDoubleBrace` : Represents the characters `{{`
- `CloseDoubleBrace`: Represents the characters `}}`
- `StrIdentifier`: Represents a string ```Hello```
- `OpenAngleBracket`: Represents the characters `<` 
- `CloseAngleBracket`: Represents the characters `>`

### Parser
I'm still working on this part. The goal is to convert the tokens into an AST tree.


### Template engine
I want to focus on very simple things for now :
- Control structures
  - `@if()` / `@endif()`
  - `@foreach()` / `@endforeach()`
- Variables
  - `@var()` / `{{ var }}`

Usage could be something like this :
```html
<html lang='en'>
  <head>
    <title>@var(title)</title>
  </head>
  
  <body>
    @if(isAuthenticated)
      <h1>You are authenticated !</h1>
    
    @foreach(friend of friends)
      <p>{{ friend.name }}</p>
    @endforeach
    
    @endif
  </body>
</html>
```