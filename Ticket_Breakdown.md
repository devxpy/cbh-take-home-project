# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Create a new Table `FacilityAgents`

**Include the following columns:**
1. `facility` - Foreign key to `Facilities(id)`  
2. `agent` - Foreign key to `Agents(id)`
3. `customAgentId` - The custom Agent ID assigned by the `facility` for this `agent`. This can be a string or uuid depending on the facility requirements.

**Implementation details:**
1. Ensure `customAgentId` is `UNIQUE` across a facility.
2. Ensure `facility` and `agent` are `UNIQUE` together
3. Populate this table with some test data so end reports can be generated and tested.

**Acceptance criteria:** Database Table created & migrations performed with no conflicts to existing schema 

**Time/effort estimates:** 30 minutes

### Update the code to accept `customAgentId` when saving the data

**Implementation details:**
1. Update the data entry systems so that they accept a `customAgentId` when a new Agent is assigned to a Facility.
2. In addition, we should follow up with our existing Facilities to check if they have a list of `customAgentId`s, and update our database accordingly.  

**Acceptance criteria:** Data entry code updated + Old database is updated if our existing Facilities require it. 

**Time/effort estimates:** 2 hours

### Update `getShiftsByFacility` to include the `customAgentId` in the returned metadata

**Implementation details:**

1. Write a database query to fetch all the `customAgentId`s for all the Agents that have worked Shifts that quarter at the given Facility
2. In the returned metadata, return the fetched `customAgentId`s for each Agent assigned to each Shift.
3. Handle the case where `customAgentId` is not present
4. Use a batched read operation for faster query time

**Acceptance criteria:** Correct database query written with tests & `customAgentId` returned for Agents in the metadata if they assigned. 

**Time/effort estimates:** 2 hours

### Update `generateReport` to include the `customAgentId`

**Implementation details:**
1. In the PDF writer, check if the `customAgentId` is present for a given agent, and displays it in the generated report, under each Agent.
2. Avoid Leaking the internal database ID of the Agent.

**Acceptance criteria:** The correct `customAgentId` shows up for agents if they are assigned.

**Time/effort estimates:** 1 hour
