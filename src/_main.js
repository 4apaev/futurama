

































































var app = Application.currentApplication()
app.includeStandardAdditions = true

var Finder = Application('Finder')
var slice = [].slice.call.bind([].slice)
var selection = slice(Finder.selection())



(function(code) {

  var res = maybe(function() {
    return new Function('name', code)
  }, code)


  res.err && assert(res.err, 'bad input')
  return

})(app.displayDialog('How to modify the name?', { defaultAnswer: 'return name.replace(/\s+/g, '').toLowerCase()' }).textReturned)



var exec = maybe(function() {

  return new Function('name', code)
}, code)


if (ex)
new Function('name', code)

var exec = new Function('name', code)

var assign = Object.assign



var tasks = selection.reduce(resolve, [])

assert(tasks.length, 'No files to rename!')

var msg = 'preview:\n' + tasks.map(preview).join('\n');


app.displayDialog('These files will be renamed:\n\n' + tasks.map(preview).join('\n'))








function resolve(buf, item) {
    if (item.from != task.to) {
      var name = item.name()
      var olo = maybe(exec, null, name)

      olo.err && assert(olo.err, 'Cannot rename', name)
      var target = assert(olo.value, 'Cannot rename', name, 'expression returned empty result')

      buf.push({ item: item, from: name, to: target })
    }
    return buf
  }



function preview(tasks) {
    assert(tasks.length, 'No files to rename!');
    var msg = tasks.map(function(task) { return task.from + ' => ' + task.to }).join('\n')



    prompt('These files will be renamed:\n\n' + msg)
  }




function prompt(text, opts, fail) {
  var res = maybe(app.displayDialog, app, text, opts||{})
  if (res.err && fail)
      throw res.err || new Error('Error '+ text)

  return res.err ? false : res.value.textReturned||true
}



function maybe(fn, ctx) {
  var err, res, args = slice(arguments, 2);
  try {
    res = fn.apply(ctx, args);
  } catch(e) {
    err=e
  }
  return { value: res, err: err }
}

function maybeFail(fn, ctx) {
  try {
    var res = fn.apply(ctx, slice(arguments, 2));
    return res
  } catch(e) {
    return assert(e)
  }
}


function assert(exp) {
  var iserr = exp instanceof Error
  if (iserr || !exp) {
    var msg = slice(arguments, 1).concat(toString(exp)).join(' ')
    app.displayAlert('Error', { message: msg });
    throw new Error(msg)
  }
  return exp
}

function toString(x) {
  return x && (x.message || String(x) || '') || '';
}
