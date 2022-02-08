import * as React from "react";
import { dark, light } from "../styles/theme";
import Editor from "..";
import { ChakraProvider } from "@chakra-ui/react";
import chakraTheme from "../styles/customTheme";

class YoutubeEmbed extends React.Component<{
  attrs: any;
  isSelected: boolean;
}> {
  render() {
    const { attrs } = this.props;
    const videoId = attrs.matches[1];

    return (
      <iframe
        className={this.props.isSelected ? "ProseMirror-selectednode" : ""}
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=2`}
      />
    );
  }
}

const embeds = [
  {
    title: "YouTube",
    keywords: "youtube video tube google",
    defaultHidden: true,
    // eslint-disable-next-line react/display-name
    icon: () => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
        width={24}
        height={24}
      />
    ),
    matcher: url => {
      return url.match(
        /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
      );
    },
    component: YoutubeEmbed,
  },
];

export default function Example() {
  const d = false;
  const { body } = document;
  if (body) body.style.backgroundColor = d ? dark.background : light.background;
  return (
    <ChakraProvider theme={chakraTheme}>
      <Editor
        disableExtensions={["table", "container_notice", "hr", "highlight"]}
        uploadImage={file => {
          console.log("File upload triggered: ", file);
          // Delay to simulate time taken to upload
          return new Promise(resolve => {
            setTimeout(() => resolve(URL.createObjectURL(file)), 1500);
          });
        }}
        dark={d}
        embeds={embeds}
        onChange={e => {}}
        defaultValue={"Strike\n\n\\\nhmm\n\nout"}
        styledEditor={{
          padding: "10px 20px 150px 30px",
          height: "calc(100vh - 140px)",
          overflowWrap: "break-word",
        }}
      />
    </ChakraProvider>
  );
}
