class CreateOffers < ActiveRecord::Migration[5.0]
  def change
    create_table :offers do |t|
      t.string :position
      t.string :location
      t.datetime :startDate
      t.datetime :deadlineDate

      t.timestamps
    end
  end
end
