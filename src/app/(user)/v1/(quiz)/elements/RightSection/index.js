// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import CodeEditor from "@/components/atoms/CodeEditor";
// import { SOCKET_EVENTS } from "@/lib/socket/events";
// import { socketSelector } from "@/store/features/socket/selectors";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import {
//   chooseAnswer,
//   clearResponse,
//   markAsAttempted,
// } from "@/store/features/test";
// import { testSelector } from "@/store/features/test/selectors";
// import { CHOICES_MAPPING, fireEventWithAck, getKeyByValue } from "@/utils";
// import {
//   Box as MuiBox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
// import { Padding } from "@mui/icons-material";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function RightSectionWithTabs() {
//   const dispatch = useDispatch();
//   const testState = useSelector(testSelector);
//   const socket = useSelector(socketSelector);

//   const [tabValue, setTabValue] = React.useState(0);
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleChange = (e) => {
//     const { value } = e.target;
//     const currentQuestion =
//       testState?.testInfo?.question?.[testState?.currentIndex];
//     dispatch(markAsAttempted());

//     fireEventWithAck(socket, {
//       eventName: SOCKET_EVENTS.ADD_QUESTION_STATUS,
//       payload: {
//         questionStatus: {
//           [currentQuestion?.id]: "attempted",
//         },
//       },
//     });

//     const payload = {
//       choiceMade: { [currentQuestion?.id]: value },
//       currentIndex: testState?.currentIndex,
//     };

//     fireEventWithAck(socket, {
//       eventName: SOCKET_EVENTS.ADD_ANSWER_RESPONSE,
//       payload,
//       callback: (response) => { },
//     });

//     dispatch(
//       chooseAnswer({ questionId: currentQuestion?.id, selectedIndex: value })
//     );
//   };

//   return (
//     <>
//       <PanelGroup direction="vertical">
//         <Panel>
//           <div className="bg-primary-400 h-full border rounded-lg border-solid border-primary-400">
//             <CodeEditor />
//           </div>
//         </Panel>
//         <PanelResizeHandle>
//           <div className="relative bg-primary-100 justify-center h-2 flex items-center">
//             <svg className="absolute w-4 h-4 text-white" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
//               />
//             </svg>
//           </div>
//         </PanelResizeHandle>
//         <Panel>
//           <div className="bg-primary-400 h-full border rounded-lg border-solid border-primary-400">
//             <PanelGroup direction="horizontal">
//               <Panel>
//                 <div className="text-lg font-semibold flex justify-between text-white p-2 border-b border-solid border-[#32394a]">
//                   <span>Testcases</span>
//                   <span className="flex items-center px-2 text-blue-300 border border-solid border-blue-300 text-[14px] rounded-lg cursor-pointer">
//                     <PlayArrowIcon></PlayArrowIcon> Run
//                   </span>
//                 </div>
//                 <MuiBox sx={{ width: "100%" }}>
//                   <MuiBox sx={{ borderBottom: 1, borderColor: "divider" }}>
//                     <Tabs
//                       value={tabValue}
//                       onChange={handleTabChange}
//                       aria-label="basic tabs example"
//                     >
//                       <Tab label="Case 1" {...a11yProps(0)} />
//                       <Tab label="Case 2" {...a11yProps(1)} />
//                       <Tab label="Case 3" {...a11yProps(2)} />
//                     </Tabs>
//                   </MuiBox>
//                   <CustomTabPanel value={tabValue} index={0}>
//                     <input
//                       type="text"
//                       placeholder="[1,2,3,4,5,6,7]"
//                       class="w-full p-2.5 text-white bg-gray-600 border border-sky-300 rounded-md mt-3 outline-none"
//                     />
//                   </CustomTabPanel>
//                   <CustomTabPanel value={tabValue} index={1}>
//                     <input
//                       type="text"
//                       placeholder="[1,2,3,4,5,6,7]"
//                       class="w-full p-2.5 text-white bg-gray-600 border border-sky-300 rounded-md mt-3 outline-none"
//                     />
//                   </CustomTabPanel>
//                   <CustomTabPanel value={tabValue} index={2}>
//                     <input
//                       type="text"
//                       placeholder="[1,2,3,4,5,6,7]"
//                       class="w-full p-2.5 text-white bg-gray-600 border border-sky-300 rounded-md mt-3 outline-none"
//                     />
//                   </CustomTabPanel>
//                 </MuiBox>
//               </Panel>
//             </PanelGroup>
//           </div>
//         </Panel>
//       </PanelGroup>
//     </>
//   );
// }



"use client";
import { SOCKET_EVENTS } from "@/lib/socket/events";
import { socketSelector } from "@/store/features/socket/selectors";
import {
  chooseAnswer,
  clearResponse,
  markAsAttempted,
} from "@/store/features/test";
import { currentSectionSelector, testSelector } from "@/store/features/test/selectors";
import { CHOICES_MAPPING, fireEventWithAck, getKeyByValue } from "@/utils";
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MCQSection from "../MCQSection";
import CodingSection from "../CodingSection";
import { CONSTANTS } from "@/constants";

const { TEST_SECTIONS } = CONSTANTS

const RightSection = () => {

  const currentSection = useSelector(currentSectionSelector)


  return (
    <>
      {currentSection == TEST_SECTIONS.PROGRAM && <CodingSection />}
      {currentSection == TEST_SECTIONS.MCQ && <MCQSection />}
    </>

  );
};

export default RightSection;
