## The task of the topic "Web Workers"

You have an input field and a Caclulate button. 
When user enters a number and presses Calculate button, the fibonacci value should be evaluated and displayed in the div with data-testid 'result' in a form **Result: evaluated_fibonacci**
While the value is being evaluated, please, display **Calculating...** in the div

Please, use web worker for the evaluation. It should receive a data in form of an object {data: someValue}. Result of its work should be a Number.

Code of your web worker should be placed in public/worker.js file.

*Additional task:* when evaluation lasts long and user does not wait till it ends, he should be able to start a new evaluation. Pressing Calculate button should stop ongoing calculation and start new.  
