import{r as s,ac as l,o as t,j as e,ai as o,aj as i}from"./index-9e089726.js";const c="https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwzfHxhdmF0YXJ8ZW58MHx8fHwxNjc4NDYzOTM4&ixlib=rb-4.0.3&q=80&w=1080";function h(){const{user:a}=s.useContext(l),n=()=>{o().signOut(),i("/")};return t("div",{className:"navbar bg-[#333346] mt-3 max-w-[1200px] mx-auto rounded-xl",children:[e("div",{className:"flex-1",children:e("a",{className:"btn btn-ghost normal-case text-xl text-white",href:"/about",children:"confess-me"})}),t("div",{className:"flex-none gap-2",children:[e("div",{children:t("p",{className:"text-white font-semibold",children:["Hey, ",a==null?void 0:a.displayName]})}),t("div",{className:"dropdown dropdown-end",children:[e("label",{tabIndex:0,className:"btn btn-ghost btn-circle avatar",children:e("div",{className:"w-10 rounded-full",children:e("img",{src:a&&a.photoURL?a.photoURL:c,loading:"lazy"})})}),t("ul",{tabIndex:0,className:"mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52",children:[e("li",{children:e("a",{href:`/profile/${a==null?void 0:a.uid}`,className:"justify-between",children:"Profile"})}),e("li",{children:e("a",{href:"/",children:"Home"})}),e("li",{children:e("a",{onClick:n,children:"Logout"})})]})]})]})]})}export{h as N};
