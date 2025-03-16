import styles from "./Pixel.module.css";

const F = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 140"
      shapeRendering="crispEdges" 
      className={styles.svgCharacter}
    >
      <path
        d="M0 0 C39.6 0 79.2 0 120 0 C120 33 120 66 120 100 C100.2 100 80.4 100 60 100 C60 113.2 60 126.4 60 140 C40.2 140 20.4 140 0 140 C0 93.8 0 47.6 0 0 Z"
        transform="translate(0,0)"
        fill="#000000"
      />
      <path
        d="M0 0 C26.4 0 52.8 0 80 0 C80 6.6 80 13.2 80 20 C60.2 20 40.4 20 20 20 C20 26.6 20 33.2 20 40 C39.8 40 59.6 40 80 40 C80 46.6 80 53.2 80 60 C60.2 60 40.4 60 20 60 C20 73.2 20 86.4 20 100 C13.4 100 6.8 100 0 100 C0 67 0 34 0 0 Z"
        transform="translate(20,20)"
        fill="#FBF005"
      />
      <path
        d="M0 0 C26.4 0 52.8 0 80 0 C80 6.6 80 13.2 80 20 C53.6 20 27.2 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(20,20)"
        fill="#FFF4CC"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 6.6 20 13.2 20 20 C13.4 20 6.8 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(20,100)"
        fill="#F8C200"
      />
    </svg>
  );
};

const L = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -10 100 150"
      shapeRendering="crispEdges"
      className={styles.svgCharacter}
    >
      <path
        d="M0 0 C19.8 0 39.6 0 60 0 C60 18.81 60 37.62 60 57 C73.2 57 86.4 57 100 57 C100 76.8 100 96.6 100 117 C67 117 34 117 0 117 C0 78.39 0 39.78 0 0 Z"
        transform="translate(0,-10)"
        fill="#000000"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 18.81 20 37.62 20 57 C33.2 57 46.4 57 60 57 C60 63.6 60 70.2 60 77 C40.2 77 20.4 77 0 77 C0 51.59 0 26.18 0 0 Z"
        transform="translate(20,10)"
        fill="#F8C200"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 18.81 20 37.62 20 57 C13.4 57 6.8 57 0 57 C0 38.19 0 19.38 0 0 Z"
        transform="translate(20,10)"
        fill="#FBF005"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 6.6 20 13.2 20 20 C13.4 20 6.8 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(20,10)"
        fill="#FFF4CC"
      />
    </svg>
  );
};

const O = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140" shapeRendering="crispEdges" className={styles.svgCharacter}>
        <path d="M0 0 C39.6 0 79.2 0 120 0 C120 46.2 120 92.4 120 140 C80.4 140 40.8 140 0 140 C0 93.8 0 47.6 0 0 Z" 
            transform="translate(0,0)" 
            style={{ fill: "#000000" }} 
        />
        <path d="M0 0 C26.4 0 52.8 0 80 0 C80 33 80 66 80 100 C53.6 100 27.2 100 0 100 C0 67 0 34 0 0 Z" 
            transform="translate(20,20)" 
            style={{ fill: "#F8C200" }} 
        />
        <path d="M0 0 C13.2 0 26.4 0 40 0 C40 19.8 40 39.6 40 60 C26.8 60 13.6 60 0 60 C0 40.2 0 20.4 0 0 Z" 
            transform="translate(40,40)" 
            style={{ fill: "#000000" }} 
        />
        <path d="M0 0 C26.4 0 52.8 0 80 0 C80 6.6 80 13.2 80 20 C53.6 20 27.2 20 0 20 C0 13.4 0 6.8 0 0 Z" 
            transform="translate(20,20)" 
            style={{ fill: "#FFF4CC" }} 
        />
        <path d="M0 0 C6.6 0 13.2 0 20 0 C20 19.8 20 39.6 20 60 C13.4 60 6.8 60 0 60 C0 40.2 0 20.4 0 0 Z" 
            transform="translate(80,40)" 
            style={{ fill: "#FBF005" }} 
        />
        <path d="M0 0 C6.6 0 13.2 0 20 0 C20 19.8 20 39.6 20 60 C13.4 60 6.8 60 0 60 C0 40.2 0 20.4 0 0 Z" 
            transform="translate(20,40)" 
            style={{ fill: "#FBF005" }} 
        />
    </svg>
  );
};

const R = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -10 120 150"
      shapeRendering="crispEdges"
      className={styles.svgCharacter}
    >
      <path
        d="M0 0 C39.6 0 79.2 0 120 0 C120 46.2 120 92.4 120 140 C80.4 140 40.8 140 0 140 C0 93.8 0 47.6 0 0 Z"
        transform="translate(0,-10)"
        fill="#000000"
      />
      <path
        d="M0 0 C26.4 0 52.8 0 80 0 C80 13.2 80 26.4 80 40 C73.4 40 66.8 40 60 40 C60 46.6 60 53.2 60 60 C46.8 60 33.6 60 20 60 C20 73.2 20 86.4 20 100 C13.4 100 6.8 100 0 100 C0 67 0 34 0 0 Z"
        transform="translate(20,10)"
        fill="#FBF005"
      />
      <path
        d="M0 0 C26.4 0 52.8 0 80 0 C80 13.2 80 26.4 80 40 C73.4 40 66.8 40 60 40 C60 33.4 60 26.8 60 20 C40.2 20 20.4 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(20,10)"
        fill="#FFF4CC"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 13.2 20 26.4 20 40 C13.4 40 6.8 40 0 40 C0 26.8 0 13.6 0 0 Z"
        transform="translate(80,70)"
        fill="#F8C200"
      />
      <path
        d="M0 0 C13.2 0 26.4 0 40 0 C40 6.6 40 13.2 40 20 C26.8 20 13.6 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(40,30)"
        fill="#000000"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 6.6 20 13.2 20 20 C13.4 20 6.8 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(20,90)"
        fill="#F8C200"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 6.6 20 13.2 20 20 C13.4 20 6.8 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(80,70)"
        fill="#FBF005"
      />
      <path
        d="M0 0 C6.6 0 13.2 0 20 0 C20 6.6 20 13.2 20 20 C13.4 20 6.8 20 0 20 C0 13.4 0 6.8 0 0 Z"
        transform="translate(80,30)"
        fill="#FBF005"
      />
    </svg>
  );
};

// ✅ **將字母組合成物件**
const PixelTextMap = {
  F: <F />,
  L: <L />,
  O: <O />,
  R: <R />,
};

// ✅ **PixelText 組件**
export default function PixelText({ text }: { text: string }) {
  const mappedChars = text.split("").map((char, i) => {
    return <span key={i}>{PixelTextMap[char]}</span>;
  });

  return <div className={styles.pixel}>{mappedChars}</div>;
}
