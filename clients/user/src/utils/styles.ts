const styles = {
  header:
    "w-full lg:h-[80px] bg-[#0F1524] flex flex-col items-center justify-between lg:flex-row",

  logo: "text-[25px] font-[500] px-[20px] text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-yellow-500",
  navItems: "py-[20px] gap-[20px] flex flex-col lg:flex-row",
  navItem: "font-poppins text-[18px] font-[500] px-[20px]",
  userMenu: "p-[20px]",

  loginButton:
    "text-[18px] font-[300] bg-gradient-to-tr from-yellow-500 to-pink-500 text-white w-[100px]",
  loginModalHeader: "flex flex-col gap-1 items-center",
  loginModalForm: "w-full justify-center items-center space-y-4",
  loginModalFormInputs: "flex flex-col gap-4 w-[100%]",
  loginModalFormButtons: "flex gap-4",
  loginModalLinks: "flex flex-col items-end gap-50",
  loginModalLink: "text-xs hover:text-yellow-500",
  loginModalCustomError: "text-danger text-xs pl-[4px]",
  loginModalSocialTitle: "text-center font-[500]",
  loginModalSocialIcons: "flex justify-center gap-4",
  registerModalTerms: "flex flex-col gap-2",

  separator: "border-t border-gray-300 my-4",
};

export default styles;
