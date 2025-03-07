import { CONSTANTS } from "@/constants";
import { deleteCookie } from "cookies-next";
import moment from "moment";

const { TEST_SECTIONS, TIME_PERIOD_VALUES } = CONSTANTS

export const objectToQueryParams = (obj) => {
    const queryParams = Object.keys(obj)
        .filter(
            (key) => obj[key] !== undefined && obj[key] !== null && obj[key] !== "",
        )
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join("&");
    return queryParams;
};

export const getSkillNameFromId = (id, skills) => {
    let skill = skills.find((item) => item?.skillId == id);
    return skill?.name || skill?.skillName || id

}
export const getExperienceLevelFromId = (id, experienceLevels) => {
    let exp = experienceLevels.find((item) => item?.id == id);
    return exp?.name || exp?.title || id

}

export const CHOICES_MAPPING = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
}
export const getKeyByValue = (obj, value) => {
    return Object.keys(obj).find(key => obj[key] === value);
};

export const formatDate = (value, showTime) => {
    if (showTime) {
        return moment(value).format("DD MMM YYYY, hh:mm A")
    } else {
        return moment(value).format("DD MMM YYYY")
    }


}

export const getAttemptedQuestionsCount = (testInfo) => {
    console.log(testInfo, "testInfo>>>");

    return testInfo?.question?.filter(question => question.choiceMade !== '').length + testInfo?.programs?.filter(question => question.status == 'attempted').length;
}
export const getReviwQuestionsCount = (testInfo) => {
    return testInfo?.question?.filter(question => question.status == 'review').length + testInfo?.programs?.filter(question => question.status == 'review').length;
}
export const getUnattemptedQuestionsCount = (testInfo) => {
    return testInfo?.question?.filter(question => question.status == 'skipped').length + testInfo?.programs?.filter(question => question.status == 'skipped').length;
}
export const getSkippedQuestionsCount = (testInfo) => {
    return testInfo?.question?.filter(question => question.status == 'skipped').length + testInfo?.programs?.filter(question => question.status == 'skipped').length;
}
export const getUnvisitedQuestionsCount = (testInfo) => {
    return testInfo?.question?.filter(question => question.status == '').length + testInfo?.programs?.filter(question => question.status == '').length;
}

export const enterFullScreen = async () => {
    try {
        const doc = document.documentElement;

        if (doc.requestFullscreen) {
            await doc.requestFullscreen();
        } else if (doc.mozRequestFullScreen) { // Firefox
            await doc.mozRequestFullScreen();
        } else if (doc.webkitRequestFullscreen) { // Chrome, Safari, Opera
            await doc.webkitRequestFullscreen();
        } else if (doc.msRequestFullscreen) { // IE/Edge
            await doc.msRequestFullscreen();
        }
    } catch (error) {
        console.log(error)
    }

};
export const exitFullscreen = async () => {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            // For Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            // For Internet Explorer/Edge
            document.msExitFullscreen();
        }
    } catch (error) {
        console.log(error)
    }

};

export const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkMicrophonePermission() {
    try {
        const permissionStatus = await navigator.permissions.query({ name: "microphone" });
        return permissionStatus.state; // "granted", "denied", or "prompt"
    } catch (error) {
        console.error("Error checking microphone permission:", error);
        return "denied"; // Fallback state
    }
}


export async function checkCameraPermission() {
    try {
        const permissionStatus = await navigator.permissions.query({ name: "camera" });
        return permissionStatus.state; // "granted", "denied", or "prompt"
    } catch (error) {
        console.error("Error checking camera permission:", error);
        return "denied"; // Fallback state
    }
}

export async function checkDisplayCapturePermission() {
    if (!navigator.permissions) {
        console.warn("Permissions API is not supported in this browser.");
        return "unknown";
    }

    try {
        const permissionStatus = await navigator.permissions.query({ name: "display-capture" });
        return permissionStatus.state; // "granted", "denied", or "prompt"
    } catch (error) {
        console.error("Error checking display-capture permission:", error);
        return "unknown";
    }
}

export async function checkAllPermissions() {
    const microphone = await checkMicrophonePermission();
    const camera = await checkCameraPermission();
    const display = await checkDisplayCapturePermission();
    // const screenSharing = await checkScreenSharingPermission();


    return {
        microphone, // "granted", "denied", "prompt", or "unknown"
        camera,     // "granted", "denied", "prompt", or "unknown"
        display
    };
}



// socketUtils.js

export const fireEventWithAck = (socket, { eventName, payload, callback }) => {

    console.log(payload, "payload>>>>")
    if (!socket || !eventName) {
        console.error('Socket or event name is missing');
        return;
    }
    // Emitting event with acknowledgment
    socket.emit("event", { eventName, payload }, (response) => {
        // Execute the provided callback with the response from the server
        if (callback) {
            callback(response);
        }
    });
};


export const calculateTestExpirationTime = (testStartTime, testTotalDuration) => {
    // Convert test duration from minutes to seconds
    const durationInSeconds = testTotalDuration * 60;

    // Calculate expiration time in seconds
    const expirationTimestamp = (testStartTime * 1000) + (durationInSeconds * 1000);

    // Convert expiration timestamp to milliseconds (Date.now() format)
    return expirationTimestamp // Convert seconds to milliseconds
};


export const countQuestions = (testInfo) => {
    let totalQuestions = testInfo?.question?.length + testInfo?.programs?.length;
    let attempted = 0;
    let unattempted = 0;
    let review = 0

    testInfo?.question?.forEach(question => {
        if (question.status == "review") {
            review++
        }
        if (question.choiceMade !== "") {
            attempted++;
        } else {
            unattempted++;
        }
    });

    testInfo?.programs?.forEach(question => {
        if (question.status == "review") {
            review++
        }
        if (question.status == "attempted") {
            attempted++;
        } else {
            unattempted++;
        }
    });

    // Calculate the percentage of attempted questions if requested
    let attemptedPercentage = ((attempted / totalQuestions) * 100).toFixed(2)

    return {
        totalQuestions: totalQuestions,
        attempted: attempted,
        unattempted: unattempted,
        review,
        attemptedPercentage
    };
}

export const removeUserCookie = () => {
    deleteCookie(CONSTANTS.COOKIE_NAME.USER)
}


export const refreshPage = (testId) => {
    "use client"
    removeUserCookie();
    if (testId) {
        window.location.replace(`/v1/?testId=${testId}`);
    } else {
        window.location.replace(`/v1`);
    }

}




// Function to stop the media tracks and revoke permissions
export const stopStreams = (streams) => {
    streams?.forEach((stream) => {
        if (stream) {
            // Stop all tracks in the stream
            stream.getTracks().forEach((track) => {
                track.stop(); // Revoke permission and release media resources
            });
        }
    });
};


export const getTestIdFromSession = () => {
    return sessionStorage.getItem("testId")
}

export const isChromeDesktop = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isChrome = /chrome/.test(userAgent) && !/edge|opr/.test(userAgent);
    const isDesktop = !/mobile|tablet|ipad|android/.test(userAgent);
    return isChrome && isDesktop;
};


export const getSkillId = (skill) => {
    return skill?.id || skill?.skillId
}
export const getSkillName = (skill) => {
    return skill?.name || skill?.title || skill?.skillName
}


export const calculateCompletionRate = (status) => {
    if (!status)
        return ""

    if (!status) return "0"

    let { pending, onGoing, finished, expired, disQualified } = status;
    const totalTestsSent = pending + onGoing + finished + expired + disQualified;
    const validTests = totalTestsSent - (expired + disQualified);

    console.log(totalTestsSent, "totalTestsSent")

    let completionRate = ((finished + disQualified) / totalTestsSent) * 100;

    return parseFloat(completionRate.toFixed(2)).toString(); // Return rate rounded to 2 decimal places
}

export const formatSkills = (skills) => {
    if (!Array.isArray(skills) || skills.length === 0) {
        return ''; // Return an empty string if it's not an array or is empty
    }

    // Capitalize the first letter of each skill
    const formattedSkills = skills.map(skill =>
        skill.charAt(0).toUpperCase() + skill.slice(1)
    );

    if (formattedSkills.length === 1) {
        return formattedSkills[0]; // Single skill
    }

    if (formattedSkills.length === 2) {
        return formattedSkills.join(' and '); // Two skills
    }

    // More than two skills
    const allButLast = formattedSkills.slice(0, -1).join(', ');
    const last = formattedSkills[formattedSkills.length - 1];
    return `${allButLast} and ${last}`;
};


// export const getScorePercentageAndColor = ({ score, totalQuestion }) => {

//     // Calculate percentage
//     const percentage = (score / totalQuestion) * 100;

//     // Determine color code
//     let color;
//     if (percentage < 50) {
//         color = '#EF4444';
//     } else if (percentage < 80) {
//         color = '#CA8A04';
//     } else {
//         color = '#16A34A';
//     }

//     return { percentage: percentage.toFixed(2), color };
// }



export const getScorePercentageAndColor = ({ percentage, totalQuestion }) => {

    let color;
    if (percentage < 50) {
        color = '#EF4444';
    } else if (percentage < 75) {
        color = '#CA8A04';
    } else {
        color = '#16A34A';
    }

    return { percentage: percentage?.toFixed(2), color };
}


export const getPassFail = (percentage) => {

    let color;
    let result;
    if (percentage < 75) {
        color = '#EF4444';
        result = "FAIL"
    } else {
        color = '#16A34A';
        result = "PASS"
    }

    return { result, percentage: `${Math.round(percentage)}%`, color };
}




export const isDebugMode = () => {
    if (process.env.NEXT_PUBLIC_DEBUG_MODE == "true") {
        return true
    } else {
        false
    }
}

export const compareArrays = (arr1, arr2) => {

    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        // throw new Error("Both inputs must be arrays.");
        return false
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    const normalizeArray = (arr) =>
        arr.map((item) => `${item.levelId}-${item.skillId}`).sort();

    const normalizedArr1 = normalizeArray(arr1);
    const normalizedArr2 = normalizeArray(arr2);

    return !normalizedArr1.every((item, index) => item === normalizedArr2[index]);
}

export const compareValues = (value1, value2) => {
    return value1 != value2
}

export const downloadPdf = async (url, token, fileName = "data") => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/pdf", // Specify the expected content type
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }

        // Convert response to Blob
        const blob = await response.blob();

        // Create a URL for the Blob and open it in a new tab
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");

        // Optional: Provide a download link with a custom filename
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = `${fileName}.pdf`; // Specify your desired filename
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Optional: Revoke the Blob URL after some time
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000); // Revoke after 1 minute
    } catch (error) {
        console.error(error);
    }
};


export const makeDeleteMessage = (moduleName, deleteId, rowSelectionModel) => {

    if (Array.isArray(deleteId) && deleteId.length > 1) {
        return `Are you sure you want to delete ${rowSelectionModel?.length} ${moduleName}s ?`
    } else {
        return `Are you sure you want to delete ${rowSelectionModel?.length} ${moduleName} ?`
    }


}

export const getCurrentQuestion = (testState) => {
    if (testState?.currentSection == TEST_SECTIONS.MCQ) {
        return testState?.testInfo?.question?.[testState?.currentIndex]
    } else {
        return testState?.testInfo?.programs?.[testState?.currentProgramIndex]
    }
}

export const generateInitialCode = (currentQuestion) => {
    let attentionMessage = `/*** Your coding question will only be marked as attempted ***\n *** after you tap on 'Run'. ***/\n\n`;

    // Parse the test case input
    const parsedInput = currentQuestion?.testCases?.[0]?.input
        ? JSON.parse(currentQuestion.testCases[0].input)
        : [];

    // Dynamically generate arguments (e.g., input1, input2, ...)
    const dynamicArgs = parsedInput.map((_, index) => `input${index + 1}`).join(', ');

    // Generate the function code dynamically
    let generatedCode = `${attentionMessage}const defaultFunction = (${dynamicArgs}) => { 
    
    // Write your logic here

    /*** You don't need to call the function, 
    just return the output from the function. ***/

};`;

    switch (currentQuestion?.programmingLanguage) {
        case "javascript":
            // Additional logic for JavaScript if needed
            break;

        case "kotlin":
            // Generate Kotlin equivalent with type reminder
            generatedCode = `${attentionMessage}fun defaultFunction(${parsedInput
                .map((_, index) => `input${index + 1}: Type`)
                .join(', ')}): ReturnType {
    
    // Write your logic here  

    /*** You don't need to call the function,  
    just return the output from the function. ***/

    // REMINDER: Define proper types  
    //  for the parameters  
    //  (e.g., input1: Int, input2: String, etc.)
}`;
            break;

        case "swift":
            // Generate Swift equivalent with type reminder
            generatedCode = `${attentionMessage}func defaultFunction(${parsedInput
                .map((_, index) => `input${index + 1}: Type`)
                .join(', ')}) -> ReturnType {
    
    // Write your logic here  

    /*** You don't need to call the function,  
    just return the output from the function. ***/

    // REMINDER: Define proper types  
    // for the parameters  
    // (e.g., input1: Int, input2: String, etc.)
}`;
            break;

        default:
            break;
    }

    console.log(currentQuestion, "currentQuestion>>>>");
    return generatedCode;
};


export const formatTestCasesInputView = (input) => {
    // const parsedInput = JSON.parse("[[1,2,3,4,5],2]");
    const parsedInput = input && JSON.parse(input);


    return parsedInput?.map((val, index) => `input${index + 1} = ${JSON.stringify(val)}`).join(', \n')



}


export const initialTestCases = () => {
    return [{
        input: "",
        output: ""
    },
    {
        input: "",
        output: ""
    },
    {
        input: "",
        output: ""
    },
    {
        input: "",
        output: ""
    }]

}

export const formatOutputView = (input) => {
    try {
        const parsedInput = input && JSON.parse(input);

        // If the parsed input is an array, return its items without the outer array
        if (Array.isArray(parsedInput)) {
            // Use map to handle the case where you have nested arrays
            return parsedInput?.map(item => {
                if (Array?.isArray(item)) {
                    // Return the inner array as a string, but without the outer brackets
                    return `[${item.join(', ')}]`;
                }
                return item;
            }).join(', ');
        }

        return input; // Return the original input if it's not an array
    } catch (e) {
        return input
    }
};

export const getSectionsCount = (testInfo) => {
    if (testInfo?.programs?.length > 0 && testInfo?.question?.length > 0) {
        return 2
    } else {
        return 1
    }

}


export const outputMatches = (userOutput, expectedOutput) => {


    let matched = (JSON.stringify(JSON.parse(userOutput)) == JSON.stringify(JSON.parse(expectedOutput)[0]))

    console.log(matched, "matched");

    return matched
}


const getDateRange = (timePeriod) => {
    switch (timePeriod) {
        case TIME_PERIOD_VALUES.TODAY:
            return {
                startDate: moment().format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            };
        case TIME_PERIOD_VALUES.YESTERDAY:
            return {
                startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
                endDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
            };
        case TIME_PERIOD_VALUES.TOMORROW:
            return {
                startDate: moment().add(1, "days").format("YYYY-MM-DD"),
                endDate: moment().add(1, "days").format("YYYY-MM-DD"),
            };
        case TIME_PERIOD_VALUES.LAST_7_DAYS:
            return {
                startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
                endDate: moment().format("YYYY-MM-DD"),
            };
        case TIME_PERIOD_VALUES.THIS_MONTH:
            return {
                startDate: moment().startOf("month").format("YYYY-MM-DD"),
                endDate: moment().endOf("month").format("YYYY-MM-DD"),
            };
        case TIME_PERIOD_VALUES.LAST_MONTH:
            return {
                startDate: moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
                endDate: moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
            };
        default:
            return { startDate: "", endDate: "" };
    }
};

// Updated `formatFiltersForTest` function
export const formatFiltersForTest = (filters) => {
    let formattedFilter = {
        status: [],
        result: [],
        startDate: "",
        endDate: "",
        page: 1,
        jobPositionValue: []
    };

    filters.forEach(filter => {
        if (filter.filterType === "Test Status") {
            filter.statusInput.forEach(status => {
                if (status === "pass" || status === "fail") {
                    formattedFilter.result.push(status);
                } else {
                    formattedFilter.status.push(status);
                }
            });
        }

        if (filter.filterType === "Job Position") {
            filter.jobPositionValue.forEach(status => {
                formattedFilter.jobPositionValue.push(status);
            });
        }

        if (filter.filterType === "Test Date" && filter.timePeriodValue) {
            const { startDate, endDate } = getDateRange(filter.timePeriodValue.value);
            formattedFilter.startDate = startDate;
            formattedFilter.endDate = endDate;
        }
    });

    return formattedFilter;
};

// const selectFilterOptions = ["Test Status", "Test Date"];

export const getFiltersCount = (filters) => {
    return filters.reduce((count, filter) => {
        if (
            (filter.filterType === "Test Date" && filter.timePeriodValue?.value) ||
            (filter.filterType === "Test Status" && filter.statusInput.length > 0) ||
            (filter.filterType === "Job Position" && filter.jobPositionValue?.length > 0)
        ) {
            count += 1;
        }
        return count;
    }, 0);
};

export const getFiltersCountChange = (filters) => {
    return filters.reduce((count, filter) => {
        if (
            (filter.filterType === "Test Date" && filter.timePeriodValue?.value) ||
            (filter.filterType === "Test Status" && filter.statusInput.length > 0) ||
            (filter.filterType === "Job Position" && filter.jobPositionValue.length > 0)
        ) {
            count += 1;
        }

        // Additional check for 'Test Status' to count each statusInput as an individual filter
        if (filter.filterType === "Test Status" && filter.statusInput.length > 0) {
            count += filter.statusInput.length - 1; // Subtract 1 because the previous check already counted 1 filter
        }

        return count;
    }, 0);
};


export const capitalizeAllWords = (str) => {
    if (!str) return "";
    return str
        .split(' ') // Split string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back together
};
