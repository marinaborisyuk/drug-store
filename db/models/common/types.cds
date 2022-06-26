namespace db.common;

define type Currency : String enum {
    Bitcoin;
    USD;
    BYN;
}

define type Price : {
    value    : Decimal;
    currency : Currency;
}

define type Phone : String;
