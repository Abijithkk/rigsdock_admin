import React from "react";
import { 
  List, ListItem, ListItemAvatar, ListItemText, 
  Avatar, Checkbox, Typography, Divider, Box 
} from "@mui/material";
import { blue } from "@mui/material/colors";
import moment from "moment";
function VendorNotification({ notifications }) {
  return (
    <List sx={{ 
      width: "100%", 
      bgcolor: "background.paper", 
      fontFamily: "Inter, sans-serif" 
    }}>
      {notifications.map((notification, index) => {
        const timeAgo = moment(notification.createdAt).fromNow();
        const showBlueDot = index % 2 === 0;

        return (
          <React.Fragment key={notification._id}>
            <ListItem sx={{ alignItems: "center", py: 1.5 }}>
              <Box sx={{ width: 12, display: "flex", justifyContent: "center", mr: 1 }}>
                {showBlueDot && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      bgcolor: blue[500],
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Box>

              <Checkbox size="small" sx={{ mr: 1 }} />

              <ListItemAvatar>
                <Avatar 
                  src={notification.image} 
                  alt={notification.ownerId.ownername} 
                  sx={{ width: 36, height: 36 }}
                />
              </ListItemAvatar>
  
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontSize: "13px", 
                      fontWeight: 500, 
                      color: "#333" 
                    }}
                  >
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: "11px", 
                        lineHeight: "16px", 
                        color: "#666C7E", 
                        fontWeight: 400 
                      }}
                    >
                      {notification.description}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontSize: "11px", 
                        fontWeight: 400, 
                        color: "#666C7E" 
                      }}
                    >
                      {timeAgo}
                    </Typography>
                  </>
                }
                sx={{ ml: 1 }}
              />
            </ListItem>

            {index < notifications.length - 1 && <Divider sx={{ mx: 2 }} />}
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default VendorNotification;
