import FeedIcon from '@mui/icons-material/Feed';
import CategoryIcon from "@mui/icons-material/Category";
import ForumIcon from '@mui/icons-material/Forum';
import Dashboard from '@/app/admin/dashboard/page';
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';

export const sideBarData = [
    {
        route: "/admin/dashboard",
        Icon: <DashboardIcon />,
        label: "Dashboard",
        isDisabled: true,
        routeName: ["/admin/dashboard"]
    },
    {
        route: "/admin/manage-skills",
        Icon: <CategoryIcon />,
        label: "Skills",
        fullLabel: "Skills",
        isDisabled: true,
        routeName: ["/admin/manage-skills", "/admin/manage-questions"]
    },
    // {
    //     route: "/admin/manage-questions",
    //     Icon: <QuizIcon />,
    //     label: "Manage Questions",
    //     isDisabled: true,
    //     routeName: "questions-route"
    // },

    {
        route: "/admin/manage-tests",
        // Icon: <FeedIcon />,
        Icon: <QuizIcon />,
        label: "Assesment",
        fullLabel: "Assesment",
        isDisabled: true,
        routeName: ["/admin/manage-tests"]
    },
    {
        route: "/admin/manage-templates",
        // Icon: <FeedIcon />,
        Icon: <FeedIcon />,
        label: "Templates",
        fullLabel: "Test Templates",
        isDisabled: true,
        routeName: ["/admin/manage-templates"]
    },
    {
        route: "/admin/feedback",
        Icon: <ForumIcon />,
        label: "Feedback",
        isDisabled: true,
        routeName: ["/admin/feedback"]

    },
];