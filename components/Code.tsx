import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { ActionIcon, CopyButton, createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  code: {
    position: "relative",
  },
  icons: {
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 1,
  },
}));

const Code = ({
  children,
  className,
}: {
  children: string; // For some reason this works but the "correct types" throw errors
  className?: string;
}) => {
  const { classes } = useStyles();
  const languageMatch = /language-(\w+)/.exec(className || "");

  return (
    <div className={classes.code}>
      <div className={classes.icons}>
        <CopyButton value={children}>
          {({ copied, copy }) => (
            <ActionIcon
              onClick={copy}
              color="gray"
              size="sm"
              variant="transparent"
            >
              {copied ? <IconCopyCheck /> : <IconCopy />}
            </ActionIcon>
          )}
        </CopyButton>
      </div>

      <SyntaxHighlighter language={languageMatch?.[1]} style={theme}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
