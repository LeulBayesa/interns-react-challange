import { render, screen, fireEvent } from "@testing-library/react";
import FetchActors from "./components/hooks/FetchActors";
import ActorList from "./components/actors/ActorList";
import ActorCard from "./components/actors/ActorCard";
import Pagination from "./components/layouts/Pagination";
import Home from "./pages/Home";

jest.mock("./components/hooks/FetchActors.js");

// Mock data for tests
const mockActors = [
  { name: "Luke Skywalker", height: "172", birth_year: "19BBY", url: "1" },
  { name: "Darth Vader", height: "202", birth_year: "41.9BBY", url: "2" },
];

describe("Component Tests", () => {

  // Home Component Tests
  describe("Home Component", () => {
    test("renders loading state", () => {
      FetchActors.mockReturnValue({
        actors: [],
        loading: true,
        error: null,
      });
      render(<Home />);
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("renders error state", () => {
      FetchActors.mockReturnValue({
        actors: [],
        loading: false,
        error: { message: "Test Error" },
      });
      render(<Home />);
      expect(screen.getByText(/Error: Test Error/i)).toBeInTheDocument();
    });

    test("opens and closes actor detail modal", () => {
      FetchActors.mockReturnValue({
        actors: mockActors,
        loading: false,
        error: null,
      });

      render(<Home />);

      // Click the first "Detail" button
      const detailButtons = screen.getAllByText(/Detail/i);
      expect(detailButtons).toHaveLength(mockActors.length);

      fireEvent.click(detailButtons[0]);

      // Ensure the modal is present
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();

      // Close the modal
      fireEvent.click(screen.getByRole('button', { name: /Close/i }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  // ActorList Component Tests
  describe("ActorList Component", () => {
    test("renders actors and handles detail click", () => {
      const handleDetailClick = jest.fn();
      render(<ActorList actors={mockActors} onDetailClick={handleDetailClick} />);

      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();

      // Use a unique identifier to target the button
      fireEvent.click(screen.getAllByText(/Detail/i)[0]);
      expect(handleDetailClick).toHaveBeenCalledWith(mockActors[0]);
    });

    test("displays no actors message when none found", () => {
      render(<ActorList actors={[]} onDetailClick={() => {}} />);
      expect(screen.getByText(/No actors found matching your search criteria./i)).toBeInTheDocument();
    });

    test("search filter works correctly", () => {
      render(<ActorList actors={mockActors} onDetailClick={() => {}} />);
      fireEvent.change(screen.getByPlaceholderText(/Search for your favorite actors.../i), { target: { value: 'Darth Vader' } });
      expect(screen.queryByText(/Luke Skywalker/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
    });
  });

  // ActorCard Component Tests
  describe("ActorCard Component", () => {
    test("renders actor details and handles detail click", () => {
      const handleDetailClick = jest.fn();
      render(<ActorCard actor={mockActors[0]} onDetailClick={handleDetailClick} />);

      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Height: 172 cm/i)).toBeInTheDocument();
      expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();

      fireEvent.click(screen.getByText(/Detail/i));
      expect(handleDetailClick).toHaveBeenCalledWith(mockActors[0]);
    });
  });

  // Pagination Component Tests
  describe("Pagination Component", () => {
    test("renders pagination buttons and handles page changes", () => {
      const handlePageChange = jest.fn();
      const handleItemsPerPageChange = jest.fn();
  
      render(
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={handlePageChange}
          itemsPerPage={5}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      );
  
      expect(screen.getByTestId('page-number-1')).toBeInTheDocument();
      expect(screen.getByTestId('page-number-2')).toBeInTheDocument();
      expect(screen.getByTestId('page-number-3')).toBeInTheDocument();
  
      fireEvent.click(screen.getByTestId('page-number-2'));
      expect(handlePageChange).toHaveBeenCalledWith(2);
  
      fireEvent.change(screen.getByLabelText(/Items per page:/i), { target: { value: '10' } });
      expect(handleItemsPerPageChange).toHaveBeenCalledWith(10);
    });
  
    test("disables prev button on first page and next button on last page", () => {
      const handlePageChange = jest.fn();
  
      render(
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={handlePageChange}
          itemsPerPage={5}
          onItemsPerPageChange={() => {}}
        />
      );
  
      expect(screen.getByTestId('prev-button')).toBeDisabled();
      fireEvent.click(screen.getByTestId('next-button'));
      expect(handlePageChange).toHaveBeenCalledWith(2);
    });
  });
});
