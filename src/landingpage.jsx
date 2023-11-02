import "./styles.css";

export default function LandingPage() {
  return (
    <div className="Landingpage">
      <div className="buttonsofcheck">
        <input className="recruiter" type="button" value="I am a Recruiter" />
        <input
          className="casualperson"
          type="button"
          value="I am here to casually 👀 this project "
        />
      </div>
    </div>
  );
}
