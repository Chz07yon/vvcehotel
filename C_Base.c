#include <stdio.h>
#include <string.h>
struct hotel {
  int p, price, quantity, total;
  char fname[20];
};
int main() {
  int nf, a[9], i;
  float ba = 0, dis, dis1, gst, cgst, sgst, gas;
  char cname[20];
  struct hotel h[20];
  int p, quantity, price, total;
  char fname[20];
  printf("\nEnter the Customer name:");
  scanf("%s", cname);
  printf("\nEnter the Phone Number:");
  for (i = 0; i <= 9; i++) {
    scanf("%d", &a[i]);
  }
  printf("\nEnter the number of food:");
  scanf("%d", &nf);
  for (p = 1; p <= nf; p++) {
    printf("\n%d.Enter the food name:", p);
    scanf("%s", h[p].fname);
    printf("\nEnter the price:");
    scanf("%d", &h[p].price);
    printf("\nEnter the Quantity:");
    scanf("%d", &h[p].quantity);
    h[p].total = h[p].price * h[p].quantity;
  }
  printf("\n############################################################");
  printf("\n\t\t  ******VVCE HOTEL******");
  printf("\n############################################################");
  printf("\nFOOD NAME\tPRICE\t\tQUANTITY\tTOTAL");
  printf("\n============================================================");
  for (p = 1; p <= nf; p++) {
    printf("\n%s\t\t%d/-\t\t%d\t\t%d/-", h[p].fname, h[p].price, h[p].quantity,
           h[p].total);
  }
  for (p = 1; p <= nf; p++) {
    ba += h[p].total;
  }
  dis = ba * 0.2;
  dis1 = ba - dis;
  gst = ba * 0.05;
  cgst = ba * 0.025;
  sgst = ba * 0.025;
  gas = ba * 0.05;
  printf("\n=============================================================");
  printf("\nTOTAL COST:Rs.%.2f", ba);
  printf("\n=============================================================");
  printf("\n20 percentage Discount:%.2f", dis1);
  printf("\nGST:Rs.%.2f/-", gst);
  printf("\nCGST:Rs.%.2f/-", cgst);
  printf("\nSGST:Rs.%.2f/-", sgst);
  printf("\nGAS CHARGE:Rs.%.2f/-", gas);
  printf("\n#############################################################");
  printf("\nTOTAL BILL AMOUNT:Rs.%.2f/-", dis1 + gst + cgst + sgst + gas);
  printf("\n#############################################################");
  printf("\n\t  CUSTOMER DETAILS:-");
  printf("\n\t====================== ");
  printf("\nName : %s", cname);
  printf("\nPhone No :");
  for (i = 0; i <= 9; i++)
    printf("%d", a[i]);
  printf("\n-------------------------------------------------------------");
  printf("\n\tYOU HAVE SAVED : %.2f", dis);
  printf("\n\tPLEASE VISIT AGAIN %s", cname);
  printf("\n-------------------------------------------------------------");
}