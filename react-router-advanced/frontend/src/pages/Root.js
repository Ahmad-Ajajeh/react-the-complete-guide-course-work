import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
  //   const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation === "loading" && <p>Loading ...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
