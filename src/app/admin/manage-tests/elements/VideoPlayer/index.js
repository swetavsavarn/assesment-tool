import React, { useEffect, useRef } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const VideoPlayer = ({ streamUrl }) => {


    return (
        <div className="flex items-center justify-center">
            {/* Clickable Thumbnail with Play Icon */}
            <div className="relative">
                <a
                    href={streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    {/* Thumbnail Placeholder */}
                    <img
                        src="../../video-thumbnail.png"
                        alt="Video Thumbnail"
                        className="rounded-md border object-contain h-[250px]"
                    />
                    {/* Play Icon Overlay */}
                    <PlayCircleOutlineIcon
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '3rem',
                            color: 'white',
                            textShadow: '0px 0px 5px rgba(0, 0, 0, 0.8)',
                        }}
                    />
                </a>
            </div>
        </div>
    );
};

export default VideoPlayer;


