import Image from "next/image";
import {
  CardActions,
  Box,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import { Product } from "@/helpers/types";

export default function ProductCard({
  image,
  description,
  title,
  link,
}: Product) {
  return (
    <>
      <CardMedia
        sx={{
          height: 300,
          width: 300,
          mx: "auto",
        }}
        title={title}
      >
        <Image
          src={image}
          alt={title}
          style={{ objectFit: "contain", height: 300 }}
          width={300}
          height={300}
          priority
        />
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={`/${link}`}>Learn More</Button>
      </CardActions>
    </>
  );
}
