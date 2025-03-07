const executeCode = (functionCode, functionName, args) => {
    try {
        // Define the function dynamically and ensure the result is returned
        const fullCode = `
            ${functionCode}
            return ${functionName}(...${JSON.stringify(args)});
        `;

        // Use the Function constructor to execute the code
        const result = new Function(fullCode)();

        return { output: result }; // Return the result of the execution
    } catch (error) {
        return { error: error.message }; // Return any errors
    }
};

// Example Usage
const userFunctionCode = `
let findMax = (arr, multiply) => {
   return Math.max(...arr) * multiply;
}`;
const functionName = "findMax";
const argumentsList = [[3, 5, 7, 2, 8], 2];

// Output: { output: 8 }

const result = executeCode(userFunctionCode, functionName, argumentsList);
console.log(result); // Output: { output: 13 }
