// components/SkeletonCard.js
import React from "react";
import { Box, Skeleton } from "@mui/material"; // Assuming MUI for styling

const SkeletonCard = () => {
    return (
        <Box display="flex" flexDirection="column" padding={2} width={300} border="1px solid #e0e0e0" borderRadius={4}>
            <Skeleton variant="rectangular" width="100%" height={180} />
            <Box mt={2}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
            </Box>
        </Box>
    );
};

export default SkeletonCard;