# Hotel Data Visualization Project

Projekt je webová aplikace pro vyhledávání hotelů na základě parametrů určených uživatelem. Cílem projektu je vytvořit algoritmus pro efektivní výpočet a vizualizaci výsledků vyhledávání.

## Popis projektu

- **Vstup**: Seznam hotelů s různými parametry, na jejichž základě se provádí řazení.
- **Výstup**:
    - Seznam hotelů, které splňují zadaná kritéria a jsou seřazeny podle kvality svých parametrů.
    - Graf s vyznačenou Skyline.
- **Funkce**:
    - Data lze řadit a vyhledávat Skyline od největšího k nejmenšímu nebo naopak.
    - Nastavení lze upravit nezávisle pro každou osu.

## Způsob řešení

V rámci projektu byly použity následující přístupy a algoritmy:

- **Brute-force algoritmus**: Pro porovnání výhledů všech hotelů se všemi ostatními hotely a nalezení jejich kvality vzhledem k ostatním.
- **Divide-and-conquer algoritmus**: Pro rozdělení množiny hotelů na menší části a efektivní výpočet kvality výhledů v rámci jednotlivých částí.
- **BNL (Block Nested Loop) algoritmus**: Pro efektivní vyhledávání nejlepších hotelů na základě dominance.
- **Plane sweep algoritmus**: Pracuje na principu procházení horizontální roviny odshora dolů po seřazení podle osy x.

## Funkcionality aplikace

- **Tabulka hotelů**: Zobrazuje data hotelů v tabulce s možností stránkování.
- **Scatter Chart**: Vizualizuje data hotelů a Skyline body pomocí knihovny Chart.js.
- **Interaktivní UI**: Umožňuje uživatelům interakci s grafem a tabulkou.

## Použité technologie

- **React**: Frontend framework pro tvorbu uživatelského rozhraní.
- **Chart.js**: Knihovna pro tvorbu interaktivních grafů.
- **JavaScript**: Programovací jazyk pro aplikační logiku.
- **CSS Modules**: Pro stylování komponent.

## Struktura projektu

- `src/table.js`: Obsahuje komponentu tabulky s logikou stránkování.
- `src/ScatterChart.js`: Implementuje vizualizaci dat pomocí scatter grafu.
- `src/setupTests.js`: Konfigurace testovacích utilit.

## Results 

The results of the project are located in the docs folder.